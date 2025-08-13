# server.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime
import sys
from ppo.ppo import PPOAgent
import torch
import numpy as np

# Resolve paths relative to this file so Gunicorn and direct runs behave the same
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR.parent.joinpath('.env'))
app = Flask(__name__,
            static_url_path='/',
            static_folder='dist')

# Allow CORS from local frontends
CORS(
    app,
    origins=[
        'http://localhost:8080',
        'http://localhost:10000',
        'http://localhost:3001',
        'http://0.0.0.0:3001',
        'http://0.0.0.0:10000',
        'https://apeiron-ascend-ai-72.onrender.com',
        'http://127.0.0.1:10000'
    ],
    supports_credentials=True
)

# NVIDIA API config
NVIDIA_VILA_API_URL = "https://ai.api.nvidia.com/v1/vlm/nvidia/vila"
NVIDIA_NVCF_ASSET_URL = "https://api.nvcf.nvidia.com/v2/nvcf/assets"
# API_KEY = os.getenv('VITE_NVIDIA_VILA_API_KEY')  # Set this in your .env
API_KEY = os.environ.get('VITE_NVIDIA_VILA_API_KEY')

if not API_KEY:
    print("VITE_NVIDIA_VILA_API_KEY environment variable is required")
    sys.exit(1)

K_SUPPORTED_LIST = {
    "png": ["image/png", "img"],
    "jpg": ["image/jpg", "img"],
    "jpeg": ["image/jpeg", "img"],
    "mp4": ["video/mp4", "video"]
}

# Setup PPO agent
agent = PPOAgent(input_size=1000,
                     n_inputs=6,
                     d_model=128,
                     device='cpu')
checkpoint_path = BASE_DIR / 'ppo' / 'ppo_model.pt'
checkpoint = torch.load(str(checkpoint_path), map_location='cpu')
agent.ac.load_state_dict(checkpoint['actor_critic_state_dict'])
agent.opt.load_state_dict(checkpoint['optimizer_state_dict'])

# Temp user stat
user_stat = [80,70,40,60,50,30]

# Normalise user stat
def normalise_state(state, exponent=10):
    if len(state) != 6:
        raise ValueError("State must be of length 6.")
    state = np.array(state, dtype=np.float32)
    state = state ** exponent
    state = state / np.sum(state)
    return state

def get_extension(filename):
    """Get file extension from filename"""
    last_dot_index = filename.rfind('.')
    if last_dot_index == -1:
        return ''
    return filename[last_dot_index + 1:].lower()

def mime_type(ext):
    """Get MIME type for file extension"""
    return K_SUPPORTED_LIST.get(ext, [''])[0]

def media_type(ext):
    """Get media type (img/video) for file extension"""
    return K_SUPPORTED_LIST.get(ext, ['', ''])[1]

def upload_asset(file_buffer, file_name, description):
    """Upload asset to NVIDIA (and S3) server-side"""
    ext = get_extension(file_name)
    if ext not in K_SUPPORTED_LIST:
        raise ValueError(f"Unsupported file extension: {ext}")

    # 1. Get upload URL from NVIDIA
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    post_data = {
        "contentType": mime_type(ext),
        "description": description
    }
    
    authorize_res = requests.post(NVIDIA_NVCF_ASSET_URL, json=post_data, headers=headers)
    authorize_res.raise_for_status()
    authorize_data = authorize_res.json()

    # 2. Upload file to S3 using the upload URL
    upload_headers = {
        "x-amz-meta-nvcf-asset-description": description,
        "content-type": mime_type(ext)
    }
    
    upload_res = requests.put(authorize_data['uploadUrl'], data=file_buffer, headers=upload_headers)
    upload_res.raise_for_status()

    return str(authorize_data['assetId'])

def delete_asset(asset_id):
    """Delete asset from NVIDIA"""
    headers = {"Authorization": f"Bearer {API_KEY}"}
    url = f"{NVIDIA_NVCF_ASSET_URL}/{asset_id}"
    
    delete_res = requests.delete(url, headers=headers)
    delete_res.raise_for_status()

# Serve static files
@app.route('/')
def serve_static():
    return send_from_directory(app.static_folder, "index.html")

# Main endpoint: handles file upload, NVIDIA API, and asset cleanup
@app.route('/api/analyze-media', methods=['POST'])
def analyze_media():
    try:
        files = request.files.getlist('files')
        query = request.form.get('query', '')
        stream = request.form.get('stream', 'false').lower() == 'true'
        
        if not files or len(files) == 0:
            return jsonify({'error': 'No files provided'}), 400

        asset_list = []
        media_content = ""
        has_video = False

        # Upload all files and collect asset IDs
        for file in files:
            ext = get_extension(file.filename)
            if ext not in K_SUPPORTED_LIST:
                return jsonify({'error': f'{file.filename} format is not supported'}), 400
            
            if media_type(ext) == "video":
                has_video = True

            file_buffer = file.read()
            asset_id = upload_asset(file_buffer, file.filename, "Reference media file")
            asset_list.append(asset_id)
            media_content += f'<{media_type(ext)} src="data:{mime_type(ext)};asset_id,{asset_id}" />'

        if has_video and len(files) != 1:
            for asset_id in asset_list:
                delete_asset(asset_id)
            return jsonify({'error': "Only a single video is supported."}), 400

        asset_seq = ','.join(asset_list)
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "NVCF-INPUT-ASSET-REFERENCES": asset_seq,
            "NVCF-FUNCTION-ASSET-IDS": asset_seq,
            "Accept": "application/json"
        }
        
        messages = [{"role": "user", "content": f"{query} {media_content}"}]
        payload = {
            "max_tokens": 1024,
            "temperature": 0.2,
            "top_p": 0.7,
            "seed": 50,
            "num_frames_per_inference": 8,
            "messages": messages,
            "stream": stream,
            "model": "nvidia/vila"
        }

        # Call NVIDIA inference API
        response = requests.post(NVIDIA_VILA_API_URL, json=payload, headers=headers)
        response.raise_for_status()

        # Clean up uploaded assets
        for asset_id in asset_list:
            delete_asset(asset_id)

        return jsonify(response.json())
        
    except Exception as error:
        print(f'Error in analyze-media: {error}')
        return jsonify({
            'error': 'Internal server error',
            'message': str(error)
        }), 500

@app.route('/api/color-rl', methods=['POST'])
def color_rl():
    try:
        # data = request.json
        # print(data)

        user_stat = request.json.get('userStat', [])
        user_stat = normalise_state(user_stat)
        results = agent.select_action(user_stat)
        color_scheme = results[0] * 255
        first_color = color_scheme[0]
        return jsonify({'color': first_color.tolist()})

        # # Get prediction
        # prediction = agent.predict(user_stat)
        # print(prediction)
    except Exception as error:
        print(f'Error in color-rl: {error}')
        return jsonify({
            'error': 'Internal server error',
            'message': str(error)
        }), 500

# Health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK', 
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    print(f"Proxy server running at http://localhost:{port}")
    print(f"Health check: http://localhost:{port}/health")
    app.run(host='0.0.0.0', port=port, debug=True)

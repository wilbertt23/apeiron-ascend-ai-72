// server.js
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import multer from 'multer';
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = 3001;

// Multer for file uploads (in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Allow CORS from your frontend
app.use(cors({
  origin: 'http://localhost:8080', // Change if your frontend runs elsewhere
  credentials: true,
}));
app.use(express.json());

// NVIDIA API config
const NVIDIA_VILA_API_URL = "https://ai.api.nvidia.com/v1/vlm/nvidia/vila";
const NVIDIA_NVCF_ASSET_URL = "https://api.nvcf.nvidia.com/v2/nvcf/assets";
const API_KEY = process.env.VITE_NVIDIA_VILA_API_KEY; // Set this in your .env

if (!API_KEY) {
  console.error("VITE_NVIDIA_VILA_API_KEY environment variable is required");
  process.exit(1);
}

const kSupportedList = {
  "png": ["image/png", "img"],
  "jpg": ["image/jpg", "img"],
  "jpeg": ["image/jpeg", "img"],
  "mp4": ["video/mp4", "video"]
};

const query = `
You are a professional video game analyst. You are given a video of me playing a video game called Apeiron.
My characters have a green health bar above them, and the enemy characters have a red health bar above them.
My mana count is displayed in the buttom right corner of the screen, under the user's deck. Mana is used to cast spells.
Analyze my performance on the following metrics:
- Overall performance: How well the player performs in the game. (0-10, one decimal place)
- Gameplay style: How the player plays the game. (aggressive, passive, balanced, etc.)
- Actions per minute: How many actions the player takes per minute. (int)
- Accuracy: How many skills landed on the enemy. (percentage)
- Efficiency: Mana efficiency, how much mana is used per skill. (percentage)
- Apaptability: How well the player adapts to the enemy's actions. (percentage)
And provide the following detailed skill analysis:
- Offensiveness
- Defensiveness
- Mana management
- Skill usage
- Tactics
- Positioning
Also, provide a detailed analysis of my strengths and weaknesses in short sentences.
- Strengths: based on my performance, what are my strengths? (2-3 points, with explinations)
- Weaknesses: based on my performance, what are my weaknesses? (2-3 points, with explinations)


Format the response in a JSON object with the following structure:
{
    "overallScore": ,
    "playstyle": ,
    "metrics": {
        "apm": ,
        "accuracy": ,
        "efficiency": ,
        "adaptability": 
    },
    "skillData":{
        "offensiveness": ,
        "defensiveness": ,
        "manaManagement": ,
        "skillUsage": ,
        "tactics": ,
        "positioning": 
    },
    "strengths": ,
    "weaknesses": 
}

Only return the JSON object, no other text or comments.
`;

function getExtension(filename) {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) return '';
  return filename.slice(lastDotIndex + 1).toLowerCase();
}
function mimeType(ext) {
  return kSupportedList[ext]?.[0] || '';
}
function mediaType(ext) {
  return kSupportedList[ext]?.[1] || '';
}

// Upload asset to NVIDIA (and S3) server-side
async function uploadAsset(fileBuffer, fileName, description) {
  const ext = getExtension(fileName);
  if (!(ext in kSupportedList)) throw new Error(`Unsupported file extension: ${ext}`);

  // 1. Get upload URL from NVIDIA
  const headers = {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };
  const postData = {
    contentType: mimeType(ext),
    description: description
  };
  const { data: authorizeRes } = await axios.post(NVIDIA_NVCF_ASSET_URL, postData, { headers });

  // 2. Upload file to S3 using the upload URL
  await axios.put(authorizeRes.uploadUrl, fileBuffer, {
    headers: {
      "x-amz-meta-nvcf-asset-description": description,
      "content-type": mimeType(ext)
    }
  });

  return authorizeRes.assetId.toString();
}

// Delete asset from NVIDIA
async function deleteAsset(assetId) {
  const headers = { "Authorization": `Bearer ${API_KEY}` };
  const url = `${NVIDIA_NVCF_ASSET_URL}/${assetId}`;
  await axios.delete(url, { headers });
}

// Main endpoint: handles file upload, NVIDIA API, and asset cleanup
app.post('/api/analyze-media', upload.array('files'), async (req, res) => {
  try {
    const files = req.files;
    const { query = 'Describe the scene', stream = false } = req.body;
    if (!files || files.length === 0) return res.status(400).json({ error: 'No files provided' });

    const assetList = [];
    let mediaContent = "";
    let hasVideo = false;

    // Upload all files and collect asset IDs
    for (const file of files) {
      const ext = getExtension(file.originalname);
      if (!(ext in kSupportedList)) return res.status(400).json({ error: `${file.originalname} format is not supported` });
      if (mediaType(ext) === "video") hasVideo = true;

      const assetId = await uploadAsset(file.buffer, file.originalname, "Reference media file");
      assetList.push(assetId);
      mediaContent += `<${mediaType(ext)} src=\"data:${mimeType(ext)};asset_id,${assetId}\" />`;
    }

    if (hasVideo && files.length !== 1) {
      for (const assetId of assetList) await deleteAsset(assetId);
      return res.status(400).json({ error: "Only a single video is supported." });
    }

    const assetSeq = assetList.join(',');
    const headers = {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "NVCF-INPUT-ASSET-REFERENCES": assetSeq,
      "NVCF-FUNCTION-ASSET-IDS": assetSeq,
      "Accept": "application/json"
    };
    const messages = [{ "role": "user", "content": `${query} ${mediaContent}` }];
    const payload = {
      max_tokens: 1024,
      temperature: 0.2,
      top_p: 0.7,
      seed: 50,
      num_frames_per_inference: 8,
      messages: messages,
      stream: stream,
      model: "nvidia/vila"
    };

    // Call NVIDIA inference API
    const response = await axios.post(NVIDIA_VILA_API_URL, payload, { headers, responseType: 'json' });

    // Clean up uploaded assets
    for (const assetId of assetList) await deleteAsset(assetId);

    res.json(response.data);
  } catch (error) {
    console.error('Error in analyze-media:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
});
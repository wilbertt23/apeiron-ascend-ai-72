import axios from 'axios';

const invokeUrl = "https://ai.api.nvidia.com/v1/vlm/nvidia/vila";
const stream = false;
const query = 'Describe the scene';

const kNvcfAssetUrl = 'https://api.nvcf.nvidia.com/v2/nvcf/assets';
// const kNvcfAssetUrl = '/nvcf';

// Retrieve the API Key from environment variables
const kApiKey = import.meta.env.VITE_NVIDIA_VILA_API_KEY;
if (!kApiKey) {
  console.error("Generate API_KEY and export VITE_NVIDIA_VILA_API_KEY=xxxx");
  throw new Error("API Key not found");
}

const kSupportedList = {
  "png": ["image/png", "img"],
  "jpg": ["image/jpg", "img"],
  "jpeg": ["image/jpeg", "img"],
  "mp4": ["video/mp4", "video"]
};

// Get file extension (browser-compatible)
function getExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) return '';
  return filename.slice(lastDotIndex + 1).toLowerCase();
}

// Get MIME type
function mimeType(ext: string): string {
  return kSupportedList[ext]?.[0] || '';
}

// Get media type
function mediaType(ext: string): string {
  return kSupportedList[ext]?.[1] || '';
}

// Upload asset (browser-compatible)
async function uploadAsset(mediaFile: File, description: string): Promise<string> {
  const ext = getExtension(mediaFile.name);
  if (!(ext in kSupportedList)) {
    throw new Error(`Unsupported file extension: ${ext}`);
  }

  // Convert File to ArrayBuffer for browser compatibility
  const dataInput = await mediaFile.arrayBuffer();

  const headers = {
    "Authorization": `Bearer ${kApiKey}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  const postData = {
    contentType: mimeType(ext),
    description: description
  };

  // First API call to authorize asset upload
  const { data: authorizeRes } = await axios.post(kNvcfAssetUrl, postData, { headers });
  console.log(`uploadUrl: ${authorizeRes.uploadUrl}`);

  // Second API call to upload the file
  const response = await axios.put(authorizeRes.uploadUrl, dataInput, {
    headers: {
      "x-amz-meta-nvcf-asset-description": description,
      "content-type": mimeType(ext)
    }
  });

  if (response.status === 200) {
    console.log(`upload asset_id ${authorizeRes.assetId} successfully!`);
    return authorizeRes.assetId.toString();
  } else {
    console.log(`upload asset_id ${authorizeRes.assetId} failed.`);
    throw new Error(`Asset upload failed: ${authorizeRes.assetId}`);
  }
}

// Delete asset
async function deleteAsset(assetId: string): Promise<void> {
  const headers = {
    "Authorization": `Bearer ${kApiKey}`
  };
  const url = `${kNvcfAssetUrl}/${assetId}`;
  await axios.delete(url, { headers });
}

// Chat with media NVCF (updated for browser compatibility)
async function chatWithMediaNvcf(inferUrl: string, mediaFiles: File[], query: string, stream = false): Promise<unknown> {
  const assetList: string[] = [];
  const extList: string[] = [];
  let mediaContent = "";
  let hasVideo = false;

  for (const mediaFile of mediaFiles) {
    const ext = getExtension(mediaFile.name);
    if (!(ext in kSupportedList)) {
      throw new Error(`${mediaFile.name} format is not supported`);
    }

    if (mediaType(ext) === "video") {
      hasVideo = true;
    }

    console.log(`uploading file: ${mediaFile.name}`);
    const assetId = await uploadAsset(mediaFile, "Reference media file");
    console.log(`assetId: ${assetId}`);
    assetList.push(assetId);
    extList.push(ext);
    mediaContent += `<${mediaType(ext)} src="data:${mimeType(ext)};asset_id,${assetId}" />`;
  }

  if (hasVideo && mediaFiles.length !== 1) {
    throw new Error("Only a single video is supported.");
  }

  const assetSeq = assetList.join(',');
  console.log(`received asset_id list: ${assetSeq}`);

  const headers = {
    "Authorization": `Bearer ${kApiKey}`,
    "Content-Type": "application/json",
    "NVCF-INPUT-ASSET-REFERENCES": assetSeq,
    "NVCF-FUNCTION-ASSET-IDS": assetSeq,
    "Accept": "application/json"
  };

  if (stream) {
    headers["Accept"] = "text/event-stream";
  }

  const messages = [{
    "role": "user",
    "content": `${query} ${mediaContent}`
  }];

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

  // Post to the inference API
  const response = await axios.post(inferUrl, payload, {
    headers: headers,
    responseType: stream ? 'stream' : 'json'
  });

  if (stream) {
    response.data.on('data', (line: Buffer | string) => {
      console.log(line.toString());
    });
  } else {
    console.log(JSON.stringify(response.data));
  }

  // Clean up uploaded assets
  console.log(`deleting assets: ${assetList}`);
  for (const assetId of assetList) {
    await deleteAsset(assetId);
  }

  return response.data;
}

export default chatWithMediaNvcf;

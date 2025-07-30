import axios from 'axios';

// Backend server URL (make sure your backend is running on this port)
const BACKEND_API_URL = 'http://localhost:3001';

/**
 * Simple function to analyze media using the backend server
 * This avoids all CORS issues by handling uploads server-side
 * 
 * @param mediaFiles - Array of File objects to analyze
 * @param query - Text query/question about the media (default: 'Describe the scene')
 * @returns Promise with the analysis result from NVIDIA Vila API
 */
export async function analyzeMedia(mediaFiles: File[], query: string = 'Describe the scene'): Promise<any> {
  try {
    // Create FormData to send files to backend
    const formData = new FormData();
    
    // Add all files to the form data 
    mediaFiles.forEach((file) => {
      formData.append('files', file);
    });
    
    // Add the query text
    formData.append('query', query);
    
    console.log(`Sending ${mediaFiles.length} file(s) to backend for analysis...`);
    
    // Send request to backend server
    const response = await axios.post(`${BACKEND_API_URL}/api/analyze-media`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 second timeout for file uploads
    });
    
    console.log('Analysis completed successfully');
    const content = response.data.choices[0].message.content;
    console.log(content);
    return content;
    
  } catch (error) {
    console.error('Error analyzing media:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Backend server is not running. Please start the server with: node server.js');
      }
      if (error.response) {
        throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
      }
      if (error.request) {
        throw new Error('No response from server. Check if the backend is running.');
      }
    }
    
    throw error;
  }
}

// Legacy export for backward compatibility
export default analyzeMedia;

/**
 * Health check function to verify backend server is running
 */
export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/health`, { timeout: 5000 });
    return response.data.status === 'OK';
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
}
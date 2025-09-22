import { NextResponse } from 'next/server';
import { auth0 } from '../../../../../lib/auth0';

// Video Service API Configuration
const VIDEO_SERVICE_API = process.env.VIDEO_SERVICE_API || 'http://localhost:8080';

// Helper function to make authenticated requests to video service
async function makeVideoServiceRequest(endpoint, options = {}) {
  const url = `${VIDEO_SERVICE_API}${endpoint}`;
  
  // Get Auth0 access token (same pattern as shows API)
  const { token: accessToken } = await auth0.getAccessToken();
  console.log('Access Token:', accessToken);
  
  if (!accessToken) {
    throw new Error('No access token available');
  }
  
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = new Error(`Video service error: ${response.status} ${response.statusText}`);
    error.status = response.status;
    throw error;
  }
  
  return response.json();
}

export const GET = async function getProcessedVideo(request, { params }) {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Get processed video download URL from video service
    const videoData = await makeVideoServiceRequest(`/api/v1/videos/${id}/processed`);

    return NextResponse.json(videoData);
  } catch (error) {
    console.error('Error fetching processed video:', error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};

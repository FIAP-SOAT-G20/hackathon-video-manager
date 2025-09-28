import { NextResponse } from 'next/server';
import { auth0 } from '../../../lib/auth0';

// Video Service API Configuration
const VIDEO_SERVICE_API = process.env.VIDEO_SERVICE_API || 'http://localhost:8080';

// Helper function to make authenticated requests to video service
async function makeVideoServiceRequest(endpoint, options = {}) {
  const url = `${VIDEO_SERVICE_API}${endpoint}`;
  
  // Get Auth0 access token (same pattern as shows API)
  console.log('Getting access token...');
  const { token: accessToken } = await auth0.getAccessToken();
  console.log('Access Token:', accessToken);
  
  if (!accessToken) {
    console.error('No access token available');
    throw new Error('No access token available');
  }
  
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  // Debug logging for headers
  console.log('Request headers:', defaultOptions.headers);
  console.log('Making request to:', url);

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  console.log('Response status:', response.status);
  
  if (!response.ok) {
    const error = new Error(`Video service error: ${response.status} ${response.statusText}`);
    error.status = response.status;
    throw error;
  }
  
  return response.json();
}

export const GET = async function videos(request) {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const hash = searchParams.get('hash') || '';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '99999';

    // Build query string for video service
    const queryParams = new URLSearchParams();
    if (hash) queryParams.append('hash', hash);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);

    const endpoint = `/api/v1/videos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    // Fetch videos from video service
    const videoData = await makeVideoServiceRequest(endpoint);

    return NextResponse.json({
      videos: videoData.videos || [],
      total: videoData.total || 0,
      page: videoData.page || parseInt(page),
      limit: videoData.limit || parseInt(limit),
      filters: {
        hash
      }
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};

export const POST = async function createVideo(request) {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, user_id } = body;

    if (!name || !user_id) {
      return NextResponse.json(
        { error: 'Name and user_id are required' },
        { status: 400 }
      );
    }

    // Create video in video service
    const videoData = await makeVideoServiceRequest('/api/v1/videos', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description: description || '',
        user_id: parseInt(user_id)
      })
    });

    // Return the video data in the expected format
    return NextResponse.json(videoData);
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};

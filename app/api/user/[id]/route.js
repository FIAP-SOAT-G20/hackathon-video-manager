import { NextResponse } from 'next/server';
import { auth0 } from '../../../../lib/auth0';

// User Service API Configuration
const USER_SERVICE_API = process.env.USER_SERVICE_API || 'http://localhost:8080';
const AUTHORIZATION_TOKEN = process.env.USER_SERVICE_TOKEN || 'your-auth-token';

// Helper function to make authenticated requests to user service
async function makeUserServiceRequest(endpoint, options = {}) {
  const url = `${USER_SERVICE_API}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`User service error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export const GET = async function getUser(request, { params }) {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Fetch user from user service
    const userData = await makeUserServiceRequest(`/api/v1/user/${params.id}`);

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};

export const PUT = async function updateUser(request, { params }) {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email, password } = body;

    // Update user in user service
    const userData = await makeUserServiceRequest(`/api/v1/user/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};

export const DELETE = async function deleteUser(request, { params }) {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Delete user from user service
    await makeUserServiceRequest(`/api/v1/user/${params.id}`, {
      method: 'DELETE'
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};

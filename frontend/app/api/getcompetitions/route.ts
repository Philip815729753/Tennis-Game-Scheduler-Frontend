import { NextResponse } from 'next/server';
import axios from 'axios';
import apiConfig from '@/app/utils/apiConfig';

export async function GET(req: Request) {
  try {
    // Get the 'Authorization' header from the incoming request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
    }

    // Make a GET request to the backend to fetch competition data
    const response = await axios.get(`${apiConfig.backendUrl}/competitions/all`, {
      headers: {
        'Authorization': authHeader, // Pass the Authorization header for authentication
      },
    });

    // Handle the backend response
    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json({ message: `Failed to fetch competitions: ${response.statusText}` }, { status: response.status });
    }
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

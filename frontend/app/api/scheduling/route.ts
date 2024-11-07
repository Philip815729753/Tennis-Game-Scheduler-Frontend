import { NextResponse } from 'next/server';
import axios from 'axios';
import apiConfig from '@/app/utils/apiConfig';

export async function POST(req: Request) {
  try {
    // Acquire and parse FormData from the request
    const formData = await req.formData();
    const competitionId = formData.get('competitionId');

    // Validate that competitionId is provided
    if (!competitionId) {
      return NextResponse.json({ message: 'Competition ID is required' }, { status: 400 });
    }

    // Get the 'Authorization' header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header is missing' }, { status: 401 });
    }

    // Create FormData for the backend request
    const backendFormData = new FormData();
    backendFormData.append('competitionId', competitionId);

    // Send a POST request to the Spring Boot backend with axios
    const response = await axios.post(`${apiConfig.backendUrl}/schedule/default_rules`,
      backendFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': authHeader, // Pass the Authorization header for authentication
        },
      }
    );

    // Handle the backend response
    if (response.status === 200) {
      return NextResponse.json({ message: 'Fixtures scheduled successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: `Scheduling failed: ${response.statusText}` }, { status: response.status });
    }
  } catch (error) {
    // Error handling
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
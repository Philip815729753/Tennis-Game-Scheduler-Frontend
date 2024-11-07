import { NextResponse, type NextRequest } from 'next/server';
import axios from 'axios';
import apiConfig from '@/app/utils/apiConfig';

export async function POST(req: NextRequest) {
  const { username, password, confirmPassword } = await req.json();

  // Basic validation
  if (!username || !password || password !== confirmPassword) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    // using axios to send data to another API endpoint
    const response = await axios.post(`${apiConfig.backendUrl}/register`, {
      username,
      password,
    });

    return NextResponse.json({ message: 'User registered successfully', data: response.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
  }
}
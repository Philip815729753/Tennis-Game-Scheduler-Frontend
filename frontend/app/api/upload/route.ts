import { NextResponse } from 'next/server';
import axios from 'axios';
import apiConfig from '@/app/utils/apiConfig';

export async function POST(req: Request) {
  try {
    // acquire and upload FormData
    const formData = await req.formData();
    const file = formData.get('file') as File;
    // const adminId = formData.get('adminId') as string;
    // const compName = formData.get('compName') as string;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // if (!adminId || !compName) {
    //     return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    //   }

    // acquire the 'Bearer Token' from Frontend UI
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
    }

    // create FormData used for the Spring Boot Backend
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    // use axios to send file upload POST request to the Spring Boot Backend
    const response = await axios.post(`${apiConfig.backendUrl}/file/upload`, backendFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${authHeader}`,  // add Bearer Token for security
          },
    });

    // error handling responses
    if (response.status === 200) {
      return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: `Upload failed: ${response.statusText}` }, { status: response.status });
    }
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ message: `${error.message}` }, { status: 500 });
    } else {
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}


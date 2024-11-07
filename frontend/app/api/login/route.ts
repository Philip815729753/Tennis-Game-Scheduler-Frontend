import { NextResponse, type NextRequest } from 'next/server';
import axios from 'axios';
import apiConfig from '@/app/utils/apiConfig';
import { jwtDecode } from "jwt-decode";


export async function POST(req: NextRequest, res: NextResponse) {
  
  const { username, password } = await req.json();
  

  try {
    const response = await axios.post(`${apiConfig.backendUrl}/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      const token = response.data;
      const decodedToken = jwtDecode(token);

      

      let expiryDate;
      if (decodedToken.exp && decodedToken.iat) {
     
        const duration = decodedToken.exp - decodedToken.iat;
        expiryDate = new Date(Date.now() + duration * 1000);
        
        console.log('i get token');
       
      } else {
        expiryDate = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
       
        
      }

      return NextResponse.json({ 
        message: 'Login successful', 
        token, 
        expires: expiryDate.toISOString() 
      }, { status: 200 });

    } else {
      return NextResponse.json({ message: 'Login failed' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
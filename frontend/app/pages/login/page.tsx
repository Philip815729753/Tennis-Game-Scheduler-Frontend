"use client";

import Link from 'next/link';
import { message, Input } from 'antd'; // Import Ant Design's Input component
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'; // Import icons
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if both fields are empty
    if (!username || !password) {
      message.error('Both fields are required!'); // Show error toast if fields are empty
      return;
    }
    
      // Perform the login logic here (e.g., API call)
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
       
        if (response.ok) {
          const result = await response.json();
          
          message.success('Login successful');

          // Set the token in cookies
          // Cookies.set('currentUser', result.token, { expires: new Date(Date.now() + 30 * 60 * 1000) });
          Cookies.set('currentUser', result.token, { expires: new Date(result.expires) });
          localStorage.setItem("username", username);
          localStorage.setItem('selectedMenuKey', "dashboard")
          router.push('/pages/dashboard');
        } else {
          const result = await response.json();
          message.error(result.message || 'Login failed');
        }
      } catch (error) {
        message.error('Internal Server Error in login page');
      }
     
  
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/Images/tennis-balls.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Frosted glass effect container */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-0"></div>

      {/* Navbar */}
      <header className="w-full p-4 fixed top-0 left-0 bg-[#3b4f84] bg-opacity-90 backdrop-blur-md shadow-md">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left: Waverley Tennis Logo */}
          <div className="flex items-center">
            <img
              src="/Images/Waverly_Logo.png"
              alt="Waverley Tennis Logo"
              width={80}
              height={80}
            />
            <h1 className="ml-2 text-xl font-bold text-white">Waverley Tennis</h1>
          </div>

          {/* Right: Project Title */}
          <h2 className="text-xl font-semibold text-white">Project ACE</h2>
        </nav>
      </header>

      {/* Main content - Login form */}
      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-8 shadow-md w-full max-w-md mt-20">
        <h2 className="text-3xl font-bold text-center text-[#3b4f84] mb-6">Login Portal</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} // User icon
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="large"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} // Password icon
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
            />
          </div>

          <button
            className="w-full bg-[#3b4f84] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#2f3c6e] transition"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Do not have an account? <Link href="/pages/register" className="text-[#3b4f84] hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
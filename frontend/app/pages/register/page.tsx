"use client"
import { useState } from 'react';
import Link from 'next/link';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter(); // Initialize useRouter hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      message.success('Form submitted');
      router.push('/pages/login');
    } catch (error) {
      message.error('Error submitting form: ' + (error as Error).message);
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

      {/* Main content - Register form */}
      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-8 shadow-md w-full max-w-md mt-20">
        <h2 className="text-3xl font-bold text-center text-[#3b4f84] mb-6">Register Portal</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-black" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-black" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            className="w-full bg-[#3b4f84] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#2f3c6e] transition"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link href="/pages/login" className="text-[#3b4f84] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
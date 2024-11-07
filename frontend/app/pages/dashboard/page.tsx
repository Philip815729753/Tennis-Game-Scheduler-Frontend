"use client";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import withAuth from '@/app/utils/withAuth';

function Dashboard() {
  const [username, setUsername] = useState("Guest");
  const [email, setEmail] = useState("xxx@mail.com");

  useEffect(() => {
    if (typeof window !== 'undefined') { // make sure this page is running on a browser environment
      const storedUsername = localStorage.getItem("username") || "Guest";
      const storedEmail = localStorage.getItem("email") || "xxx@mail.com";
      setUsername(storedUsername);
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className="h-screen flex">
      {/* include the Sidebar */}
      <Sidebar />

      {/* Main section */}
      <div className="flex-1 flex flex-col">
        <Header username={username} email={email} pageName="Dashboard" />


        <main className="flex-1 flex flex-col items-center justify-center bg-gray-100 min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mt-48">
            <h2 className="text-2xl font-bold text-center text-[#3b4f84] mb-6">Dashboard</h2>
            <p className="text-center text-gray-700">
              Welcome to your dashboard! Here you can manage your projects and settings.
            </p>
            <div className="mt-8 flex justify-center">
              <button className="bg-[#3b4f84] text-white font-bold py-2 px-4 rounded-lg">
                View Projects
              </button>
            </div>
          </div>
            {/* Footer at the bottom */}
            <Footer />
        </main>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
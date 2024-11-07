"use client";

// components/Header.tsx
import { useState } from 'react';

type HeaderProps = {
  username?: string;
  email?: string;
  pageName?: string; // name of the current displaying page
};

function getInitials(name: string) {
  const nameArray = name.split(' ');
  const initials = nameArray.map((n) => n[0]).join('');
  return initials.toUpperCase();
}

export default function Header({ username = 'User', email = 'Email', pageName = 'Page Name' }: HeaderProps) {
  const [showPopup, setShowPopup] = useState(false); // pop-up control
  const initials = getInitials(username);

  return (
    <header className="w-full p-4 bg-[#3b4f84] text-white flex justify-between items-center">
      {/* showing page name*/}
      <div className="flex items-center">
        <img src="/Images/Waverly_Logo.png" alt="Waverley Tennis Logo" width={80} height={80} />
        <h2 className="ml-4 text-xl font-bold">{pageName}</h2>
      </div>

      <div className="relative flex items-center">
        <div
          className="w-10 h-10 bg-white text-[#3b4f84] font-bold rounded-full flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          {initials}
        </div>

        {/* pop-up  */}
        {showPopup && (
          <div className="absolute top-12 right-0 bg-white text-black p-4 rounded-md shadow-lg">
            <p className="font-bold">{username}</p>
            {/* <p className="text-sm text-gray-600">{email}</p> */}
          </div>
        )}
      </div>
    </header>
  );
}



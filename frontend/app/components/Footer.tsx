// components/Footer.tsx
"use client";

const Footer = () => {
  return (
    <footer className="bg-[#3b4f84] text-white text-center py-4 w-full mt-auto relative z-0">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Waverley Tennis. All rights reserved.</p>
        <p>Team ACE</p>
      </div>
    </footer>
  );
};

export default Footer;


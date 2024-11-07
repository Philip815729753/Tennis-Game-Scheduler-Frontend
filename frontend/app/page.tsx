import home_bg from "../public/Images/tennis-balls.jpg";
import logo from "../public/Images/Waverly_Logo.png"; // Assuming you have a logo image here
import Link from 'next/link'; // Import the Link component from Next.js

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${home_bg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Frosted glass effect container */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-0"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-12">
        {/* Navbar */}
        <header className="w-full p-4 fixed top-0 left-0 bg-[#3b4f84] bg-opacity-90 backdrop-blur-md shadow-md">
          <nav className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Left: Waverley Tennis Logo */}
            <div className="flex items-center">
              <img
                src={logo.src}
                alt="Waverley Tennis Logo"
                width={80}
                height={80}
              />
              <h1 className="ml-2 text-xl font-bold text-white">Waverley Tennis</h1>
            </div>

            {/* Right: Automated Court Events */}
            <h2 className="text-xl font-semibold text-white">Project ACE</h2>
          </nav>
        </header>

        {/* Hero section */}
        <section className="flex flex-col items-center justify-center text-center mt-32">
          <h2 className="text-5xl font-bold mt-6 text-white">Automated Court Events</h2>
          <p className="text-lg text-gray-200 mt-2">Welcome to the official Waverley Tennis platform.</p>
        </section>

        {/* Action buttons section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 max-w-5xl w-full">
          <div className="flex flex-col items-center p-6 bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-md transition hover:shadow-lg" id="register">
            <h3 className="text-2xl font-semibold mb-3 text-[#ffffff]">Register</h3>
            <p className="text-gray-700 mb-4">Register your Admin Account</p>
            {/* <a
              href="/register"
              className="bg-[#3b4f84] text-white px-6 py-2 rounded-md transition hover:bg-opacity-80"
            >
              Register Now
            </a> */}
           
            <Link className="bg-[#3b4f84] text-white px-6 py-2 rounded-md transition hover:bg-opacity-80" href="/pages/register">
              Register Now
            </Link>
            
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-md transition hover:shadow-lg" id="login">
            <h3 className="text-2xl font-semibold mb-3 text-[#ffffff]">Login</h3>
            <p className="text-gray-700 mb-4">Login to your Admin Account</p>
            {/* <a
              // href="/login"
              className="bg-[#3b4f84] text-white px-6 py-2 rounded-md transition hover:bg-opacity-80"
            >
              Login Now
            </a> */}
            
            <Link className="bg-[#3b4f84] text-white px-6 py-2 rounded-md transition hover:bg-opacity-80" href="/pages/login">
              Login Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto w-full text-center py-6 text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} SWEN90017 TEAM ACE
        </footer>
      </div>
    </main>
  );
}
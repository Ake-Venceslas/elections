"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function FooterComponent() {
  return (
    <footer className="relative text-white">
      {/* Wave Shape Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[40px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39,56.44C172.14,74,57,91,0,107.05V0H1200V0C1042.81,22.26,887.18,46.77,738,59.94,587.09,73.45,433.79,67.52,321.39,56.44Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Footer Main */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 pt-12 pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Social */}
          <div>
            <h1 className="text-2xl font-bold">
              <span className="bg-indigo-700 px-2 py-1 rounded-lg">iVOTE</span>
            </h1>
            <p className="text-sm mt-2">© Copyright 2023</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-white/20 hover:bg-white p-2 rounded-full transition">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-white/20 hover:bg-white p-2 rounded-full transition">
                <FaTwitter />
              </a>
              <a href="#" className="bg-white/20 hover:bg-white p-2 rounded-full transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Website</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Address: Dagupan City, Pangasinan</li>
              <li>Email: ivote@gmail.com</li>
              <li>Phone No.: +63 912 345 6789</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
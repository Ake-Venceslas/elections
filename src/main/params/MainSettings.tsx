"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserEdit, FaKey, FaGlobe, FaBell, FaInfoCircle, FaFileContract, FaShieldAlt, FaEnvelope } from "react-icons/fa";

const Settings = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);

  const accountItems = [
    { label: "Edit Profile", icon: <FaUserEdit />, path: "/settings/edit-profile" },
    { label: "Change Password", icon: <FaKey />, path: "/settings/change-password" },
  ];

  const linkItems = [
    { label: "About Us", icon: <FaInfoCircle />, path: "/about" },
    { label: "Terms of Service", icon: <FaFileContract />, path: "/terms" },
    { label: "Privacy Policy", icon: <FaShieldAlt />, path: "/privacy" },
    { label: "Contact Us", icon: <FaEnvelope />, path: "/contact" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 text-left">
        <button
          onClick={() => window.location.href = "/mainpage"}
          className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold text-base hover:bg-gray-300 transition"
        >
          Return
        </button>
      </div>
      <h1 className="text-2xl font-bold text-blue-800 mb-8">SETTINGS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Account Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-4">ACCOUNT</h2>
          <div className="space-y-4">
            {accountItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className="flex items-center justify-between w-full p-3 border rounded-full hover:bg-blue-50 transition"
              >
                <span className="flex items-center gap-3 text-blue-700 font-medium">
                  {item.icon} {item.label}
                </span>
                <span className="text-gray-400">›</span>
              </button>
            ))}

            {/* Language Selector */}
            <div className="flex items-center justify-between w-full p-3 border rounded-full">
              <span className="flex items-center gap-3 text-blue-700 font-medium">
                <FaGlobe /> Language
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-gray-600 outline-none"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            {/* Notification Toggle */}
            <div className="flex items-center justify-between w-full p-3 border rounded-full">
              <span className="flex items-center gap-3 text-blue-700 font-medium">
                <FaBell /> Notification
              </span>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  notifications ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                    notifications ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-4">LINKS</h2>
          <div className="space-y-4">
            {linkItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className="flex items-center justify-between w-full p-3 border rounded-full hover:bg-blue-50 transition"
              >
                <span className="flex items-center gap-3 text-blue-700 font-medium">
                  {item.icon} {item.label}
                </span>
                <span className="text-gray-400">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
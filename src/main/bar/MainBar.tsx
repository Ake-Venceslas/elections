"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// Uncomment after Clerk setup
// import { useUser } from "@clerk/nextjs";
// import { UserButton } from "@clerk/nextjs";

const MainBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // TEMPORARY MOCK USER DATA (Replace with Clerk user data)
  const user = {
    name: "John Doe",
    profileImage: "https://via.placeholder.com/80", // Replace with Clerk's user.imageUrl
  };

  // Uncomment after Clerk setup
  // const { user } = useUser();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Vote", path: "/vote", icon: "🗳" },
    { name: "Visitors Guideline", path: "/guide", icon: "📘" },
    { name: "Settings", path: "/params", icon: "⚙" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6 border-b">
        <img
          src={user.profileImage}
          alt="User profile"
          className="w-16 h-16 rounded-full border"
        />
        <p className="mt-2 font-semibold text-gray-800">{user.name}</p>
        {/* Uncomment for Clerk's built-in profile button */}
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col mt-6 space-y-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <span
              className={`flex items-center px-4 py-2 text-sm font-medium cursor-pointer rounded-lg transition-colors ${
                pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Log out Button */}
      <div className="mt-auto p-4">
        <button
          onClick={() => {
            // Uncomment after Clerk setup
            // signOut();
            router.push("/login");
          }}
          className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          🚪 Log out
        </button>
      </div>
    </div>
  );
};

export default MainBar;
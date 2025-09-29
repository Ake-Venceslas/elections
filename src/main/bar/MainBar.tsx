"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";


// Uncomment after Clerk setup
// import { useUser } from "@clerk/nextjs";
// import { UserButton } from "@clerk/nextjs";

const MainBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // TEMPORARY MOCK USER DATA (Replace with Clerk user data)


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
     

      {/* Navigation Links */}
  <nav className="flex flex-col mt-6 space-y-12">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <span
              className={`flex items-center px-6 py-3 text-lg font-bold cursor-pointer rounded-lg transition-colors ${
                pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

    </div>
  );
};

export default MainBar;
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { user, isSignedIn } = useUser();
  const MenuList = [
    { name: "Home", href: "/" },
    { name: "Create Story", href: "/create-story" },
    { name: "Explore Story", href: "/explore" },
    { name: "Contact", href: "/contact-us" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center px-4 md:px-6 py-4 max-w-full">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          >
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
            <Image src="/logo.png" alt="logo" width={60} height={60} className="object-contain" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center justify-center flex-1">
          {MenuList.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-lg text-primary font-medium hover:underline transition-all"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
              {isSignedIn ? "Dashboard" : "Get started"}
            </button>
          </Link>
          <UserButton />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          {MenuList.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-primary font-medium hover:underline"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Header;

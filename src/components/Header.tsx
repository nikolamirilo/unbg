"use client";
import { useState } from "react";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 sm:flex">
          <a
            href="#how-it-works"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            How it works
          </a>
          <a
            href="#use-cases"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Use cases
          </a>
          <a
            href="#faq"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="sm:hidden flex h-11 w-11 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? (
              <HiOutlineX className="h-7 w-7" aria-hidden="true" />
            ) : (
              <HiOutlineMenu className="h-7 w-7" aria-hidden="true" />
            )}
          </button>

          <Link
            href="#hero"
            className="hidden sm:flex rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors flex-row gap-2 justify-center items-center"
          >
            <MdOutlineRocketLaunch aria-hidden="true" /> Get Started
          </Link>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2"
        >
          <div className="flex flex-col gap-1">
            <a
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              How it works
            </a>
            <a
              href="#use-cases"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              Use cases
            </a>
            <a
              href="#faq"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              FAQ
            </a>
            <Link
              href="#hero"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors flex flex-row gap-2 justify-center items-center"
            >
              <MdOutlineRocketLaunch aria-hidden="true" /> Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

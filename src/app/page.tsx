"use client";
import { AuroraText } from '@/components/ui/aurora-text';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import React, { useCallback, useState, useEffect, useEffectEvent } from 'react';

export default function Home() {
  const [theme, setTheme] = useState("light");
  const setThemeEvent = useEffectEvent((theme: string) => { setTheme(theme) });

  useEffect(() => {
    // Check initial preference or local storage
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme) {
      setThemeEvent(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (prefersDark) {
      setThemeEvent("dark");
      document.documentElement.setAttribute('data-theme', "dark");
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col font-sans">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 z-50 sticky top-0 backdrop-blur-md bg-opacity-90">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>Products</a>
                <ul className="p-2">
                  <li><a>Price Search</a></li>
                  <li><a>Quality Compare</a></li>
                </ul>
              </li>
              <li>
                <a>Resources</a>
                <ul className="p-2">
                  <li><a>Patient Stories</a></li>
                  <li><a>Blog</a></li>
                </ul>
              </li>
              <li><a>About Us</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl font-bold text-primary tracking-tight">MedMap<span className="text-secondary text-sm self-end mb-1">.io</span></a>
        </div>

        {/* Center Navbar Dropdowns */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium gap-8">
            <li>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="m-1 text-base">Products</div>
                <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200">
                  <li><a>Price Search</a></li>
                  <li><a>Quality Data</a></li>
                  <li><a>Insurance Checker</a></li>
                </ul>
              </div>
            </li>
            <li>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="m-1 text-base">Resources</div>
                <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200">
                  <li><a>Patient Stories</a></li>
                  <li><a>Market Insights</a></li>
                  <li><a>Provider Portal</a></li>
                </ul>
              </div>
            </li>
            <li className="flex items-center"><a className="h-full flex items-center text-base">Enterprise</a></li>
          </ul>
        </div>

        <div className="navbar-end gap-4">
          {/* Theme Toggle */}
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            {/* controlled checkbox */}
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            {/* sun icon */}
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

            {/* moon icon */}
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
          </label>

          <select className="select select-bordered select-sm w-full max-w-xs " defaultValue="Mumbai">
            <option disabled>Select City</option>
            <option>Mumbai</option>
            <option>Delhi</option>
          </select>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero min-h-[75vh] bg-base-100 relative overflow-hidden">
        {/* Background blobs for premium feel */}
        <FlickeringGrid maxOpacity={0.18} color='blue' squareSize={5} />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

        <div className="hero-content text-center w-full max-w-5xl z-10 flex flex-col">
          <div className="w-full">
            <div className="badge badge-outline badge-primary mb-6 p-4 shadow-sm bg-base-100/50 backdrop-blur-sm">✨ New: AI-Powered Price Predictions</div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Healthcare Costs, <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-teal-500 to-blue-600">
                <AuroraText>
                  Transparent & Fair.
                </AuroraText>
              </span>
            </h1>
            <p className="py-6 text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
              Aggregate actual costs for medical procedures across providers in your area (MRI, dental work, surgery).
              Include insurance compatibility, wait times, and patient outcomes.
            </p>

            {/* Search Bar */}
            <div className="form-control w-full max-w-3xl mx-auto mt-8 transition-transform hover:scale-[1.01] duration-300">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Try 'MRI Scan in Bandra' or 'Root Canal'"
                  className="input input-lg w-full pl-16 pr-32 shadow-xl bg-base-100 border-2 border-base-300 rounded-full focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 h-20 text-lg placeholder-base-content/40"
                />
                <button className="btn btn-primary absolute top-2 right-2 rounded-full h-16 w-32 text-lg font-medium shadow-lg hover:shadow-primary/50 border-0  from-primary to-primary/80 z-10 text-primary-content">
                  Search
                </button>
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-8 text-sm text-base-content/50">
              <span className="flex items-center gap-1">✅ Verified Prices</span>
              <span className="flex items-center gap-1">⚡ Instant Booking</span>
              <span className="flex items-center gap-1">🛡️ Insurance Check</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - Zig Zag */}
      <div className="py-24 px-4 md:px-8 bg-base-200/50">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why MedMap?</h2>
            <p className="text-xl text-base-content/60">We bring Clarity into Healthcare.</p>
          </div>

          {/* Feature 1: Right Focused Image */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-left">
              <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-3xl">
                �
              </div>
              <h3 className="text-4xl font-bold">Total Price Transparency</h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                Never get hit with a surprise bill again. We aggregate real billing data to show you the
                <strong> exact cost</strong> of procedures before you book. Compare cash prices vs insurance rates instantly.
              </p>
              <button className="btn btn-outline btn-primary">How we gather data</button>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-teal-500/10 rounded-3xl transform rotate-3"></div>
              <div className="bg-base-100 p-8 rounded-3xl shadow-xl relative border border-base-200 h-80 flex items-center justify-center">
                {/* Placeholder for UI Image */}
                <div className="text-center">
                  <div className="text-5xl mb-4 font-mono font-bold text-teal-600">₹4,500</div>
                  <div className="text-sm text-gray-500 line-through">avg ₹8,200</div>
                  <div className="badge badge-success gap-2 mt-4 p-3">
                    Save 45%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Left Focused Image (Zig Zag) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-6 text-left md:text-right">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-3xl md:ml-auto">
                ⭐
              </div>
              <h3 className="text-4xl font-bold">Quality First</h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                Cheap doesn&apos;t mean bad. We rank providers based on <strong>clinical outcomes</strong>, infection rates,
                and verified patient reviews. Make the best choice for your health, not just your wallet.
              </p>
              <button className="btn btn-outline btn-secondary">View Ranking Methodology</button>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl transform -rotate-3"></div>
              <div className="bg-base-100 p-8 rounded-3xl shadow-xl relative border border-base-200 h-80 flex flex-col gap-4 justify-center">
                {/* Placeholder UI */}
                <div className="flex items-center gap-4 border-b border-base-200 pb-4">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                      <span>Dr</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Dr. Sharma</div>
                    <div className="text-xs text-success">98% Success Rate</div>
                  </div>
                  <div className="ml-auto text-warning">★★★★★</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                      <span>Cl</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">City Clinic</div>
                    <div className="text-xs text-success">Top 1% in Mumbai</div>
                  </div>
                  <div className="ml-auto text-warning">★★★★☆</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Right Focused Image */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-left">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-3xl">
                🛡️
              </div>
              <h3 className="text-4xl font-bold">Insurance Demystified</h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                Input your policy details and instantly see <strong>in-network</strong> providers.
                We calculate your estimated copay and deductible usage so you know what you&apos;ll owe.
              </p>
              <button className="btn btn-outline btn-accent">Check Coverage</button>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-purple-500/10 rounded-3xl transform rotate-3"></div>
              <div className="bg-base-100 p-8 rounded-3xl shadow-xl relative border border-base-200 h-80 flex items-center justify-center">
                <div className="w-full space-y-4">
                  <div className="flex justify-between items-center bg-base-200 p-3 rounded-lg">
                    <span>Bajaj Allianz</span>
                    <span className="badge badge-success">Covered</span>
                  </div>
                  <div className="flex justify-between items-center bg-base-200 p-3 rounded-lg opacity-50">
                    <span>Star Health</span>
                    <span className="badge badge-error">Out of Network</span>
                  </div>
                  <div className="flex justify-between items-center bg-base-200 p-3 rounded-lg">
                    <span>HDFC Ergo</span>
                    <span className="badge badge-success">Covered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded-t-3xl mt-auto">
        <aside>
          <div className="flex items-center justify-center mb-4">
            <span className="text-5xl filter drop-shadow-lg">🩺</span>
          </div>
          <p className="font-bold text-lg">
            MedMap Healthcare Ltd. <br />
            <span className="font-normal text-base-content/60">Democratizing healthcare access in India.</span>
          </p>
          <p className="text-sm mt-2">Copyright © 2024 - MedMap Inc.</p>
        </aside>
      </footer>
    </div>
  );
}
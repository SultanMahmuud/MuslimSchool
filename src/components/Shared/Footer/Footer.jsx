'use client'
import { Button } from "@/components/UI/button";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,

  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden bg-gradient-to-br from-[#2eca7f] via-[#14532d] to-[#001c12] pt-16 pb-8 mt-20">
      {/* Wave Background Animation */}
     <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2600 600">
          <defs>
            {/* Gradient stops match start/end for seamless loop */}
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="50%" stopColor="#047857" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
            <path
              id="wavePath"
              d="M0,300 C600,350 1200,250 1800,300 C2400,350 2600,300 2600,300 L2600,600 L0,600 Z"
            />
          </defs>
          {/* Two waves side by side for continuous motion */}
          <g className="opacity-20 animate-wave">
            <use href="#wavePath" fill="url(#waveGradient)" />
            <use href="#wavePath" x="2600" fill="url(#waveGradient)" />
          </g>
        </svg>
      </div>


      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col lg:flex-row gap-8">
        {/* Left side: Logo + Text */}
        <div className="lg:w-2/3 flex flex-col  justify-between ">
          <div>
            <div className="flex items-center mb-6">
              <img
                src="/logo.svg"
                alt="Muslim School Logo"
                className="w-12 h-12 mr-4"
              />
              <h2 className="text-white text-3xl font-semibold hind">Muslim School</h2>
            </div>
            <p className="text-white text-base leading-relaxed hind">
              দ্বীনের আলোয় জীবন আলোকিত হোক—স্বাগতম ইসলামের নতুন দুনিয়ায়! <br />
              আমাদের লক্ষ্য ইসলামের জ্ঞান পৌঁছে দেওয়া পৃথিবীর প্রতিটি কোণে। এখানে
              আপনি শুধু শিক্ষকই নন, পাবেন আন্তরিক অভিভাবক, যারা সর্বদা আপনার পাশে
              থেকে আপনার যত্ন নেবেন। <br />
              আমরা বিশ্বাস করি, দ্বীন শেখা কঠিন নয়—দরকার
              শুধু সঠিক দিকনির্দেশনা আর মানসম্মত শিক্ষা। দিনকে দ্বীনময় করতে আমরা
              আছি আপনার পাশে। আপনি পারবেন—পথ সহজ করে দেবেন স্বয়ং মহান আল্লাহ。
            </p>
          </div>
          <div className=" p-4 rounded-lg">
            <img src="https://www.qawmiuniversity.com/static/media/SSLCommerz-Pay-With-logo-All.6bb92f6b6d60c6b0c6d9.png" alt="SSLCommerz Payment" />
          </div>
        </div>

        {/* Right side: 3 Cards */}
        <div className="lg:w-2/3 grid grid-cols-2 grid-rows-2 gap-4">
          {/* Contact */}
          <div className="bg-white/20 border border-white/30 rounded-lg p-6 hind">
            <h3 className="text-white text-lg font-semibold mb-4">আমাদের সম্পর্কে</h3>
            <ul className="space-y-2 text-white">
              <li><Link href="/about">আমাদের সম্পর্কে</Link></li>
              <li><Link href="/refund-policy">মূল্যফেরতনীতি</Link></li>
              <li><Link href="/terms-conditions">ব্যবহারকারীর শর্তাবলী</Link></li>
              <li><Link href="/privacy-policy">গোপনীয়তা নীতি </Link></li>
            </ul>
          </div>

          {/* Follow Us (spans two rows) */}
          <div className="bg-white/20 border border-white/30 rounded-lg p-6 row-span-2 hind">
            <h3 className="text-white text-lg font-semibold mb-4">আমাদের সাথে কথা বলুন</h3>
            <ul className="space-y-3 text-white">
             <ul className="space-y-2 text-white">
              <li><Link href="/faq">প্রশ্নোত্তর</Link></li>
              <li><Link href="/contact">যোগাযোগ করুন</Link></li>
              <li><Link href="/student-registration">দ্বীন শিখা শুরু করুন </Link></li>
            </ul>

            </ul>
            <div className="flex items-center  mt-8">
              <a href="https://www.facebook.com/muslimschoool" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                <FaFacebookF className="w-6 h-6 " />
              </a>
              <a href="https://www.instagram.com/company/muslimschoool" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
                <FaInstagram className="w-6 h-6 mx-2" />
              </a>
              <a href="https://youtube.com/muslimschoool" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400">
                <FaYoutube className="w-6 h-6 mx-2" />
              </a>
                <a href="https://www.tiktok.com/company/muslimschoool" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
                <FaTiktok className="w-6 h-6 mx-2" />
              </a>
             
              
              <a href="https://www.linkedin.com/company/muslimschoool" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
                <FaLinkedinIn className="w-6 h-6 mx-2" />
              </a>
               <a href="https://twitter.com/muslimschoool" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                <FaTwitter className="w-6 h-6 mx-2" />
              </a>

          </div>
      
            <div className="mt-14 flex justify-end flex-col">
             <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <form className="flex flex-col gap-2">
              {/* <input
               
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-white/30 placeholder-white text-white focus:outline-none"
              /> */}
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                Subscribe
              </Button>
            </form>

            </div>

          </div>

          {/* Pay With */}
          <div className="bg-white/20 border border-white/30 rounded-lg p-6 hind">
            <h3 className="text-white text-lg font-semibold mb-4">আমাদের বিশেষত্ব</h3>
           
              <ul className=" text-white  flex flex-col gap-2">
              <li><Link href="/courses">কোর্স সমূহ</Link></li>
              <li><Link href="/live-batch">লাইভ ব্যাচ</Link></li>
              <li><Link href="/pricing">প্রাইসিং</Link></li>
              <li><Link href="/review">স্টুডেন্ট রিভিউ</Link></li>
            </ul>
            
          </div>
        </div>
      </div>

      {/* Bothrefm copyright */}
      <div className="mt-10 text-center text-white text-sm opacity-80">
        © 2025 Muslim School. All rights reserved.
      </div>

      {/* Styles for Wave Animation */}
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-200px);
          }
        }
        .animate-wave {
          animation: wave 8s linear infinite;
        }
      `}</style>
    </footer>
  );
}

export default Footer;

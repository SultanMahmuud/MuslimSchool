'use client';
import React, { useState } from "react";
import SignUp from "./Signup";
import Login from "./Login";
import ForgotPass from "./ForgotPass";

const AuthComponent = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [forgotPass, setForgotPass] = useState(false);

  if (forgotPass) {
    // Show only ForgotPass when forgotPass is true
    return (
      <div className="flex flex-col  h-screen">

            <div
        className="bg-white m-6 p-6 text-center w-full max-w-md"
        style={{
          borderRadius: "8px",
          boxShadow: "0px 14px 22px rgb(42 135 158 / 14%)",
          padding: "32px 24px",
          background: "white",
        }}
      >
       <ForgotPass onBackToLogin={() => setForgotPass(false)} />
      </div>
      </div>
    
    );
  }

  return (
    <div className="flex h-screen">
 <div
      className="hind bg-white p-6 text-center w-[400px]"
      style={{
        borderRadius: "8px",
        boxShadow: "0px 14px 22px rgb(42 135 158 / 14%)",
        
        background: "white",
        margin: "32px",
      }}
    >
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">
        {activeTab === "login" ? "একাউন্টে লগিন" : "নতুন একাউন্ট তৈরি"} করুন
      </h2>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg overflow-hidden">
        <button
          className={`flex-1 py-2 font-semibold transition-colors duration-200 ${
            activeTab === "login"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("login")}
        >
          লগিন
        </button>
        <button
          className={`flex-1 py-2 font-semibold transition-colors duration-200 ${
            activeTab === "signup"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          নতুন
        </button>
      </div>

      {/* Form Body */}
      {activeTab === "login" 
  ? <Login /> 
  : <SignUp onRegisterSuccess={() => setActiveTab("login")} />}


     {activeTab === "login"?  <button
        className={`mt-4  underline text-gray-400 transition-colors duration-200 `}
        onClick={() => setActiveTab("signup")}
      >
        নতুন একাউন্ট
      </button>:  <button
        className={`mt-4   text-gray-400 transition-colors duration-200 `}
        onClick={() => setActiveTab("login")}
      >
        <span>একাউন্ট আছে? </span>
        
        <span className="underline">লগিন করুন</span>
      </button>}
     

      {/* Forgot Password */}
      <button
        className="mt-4 text-gray-400 underline mx-3"
        onClick={() => setForgotPass(true)}
      >
        পাসওয়ার্ড ভুলে গেছেন
      </button>

      {/* Footer Contact */}
      <div className="mt-6 text-gray-400">
        যেকোনো প্রয়োজনে কল করুন{" "}
        <a href="tel:+8801922270004" className="text-blue-500 font-semibold">
          01947200111
        </a>
      </div>
    </div>
    </div>
   
  );
}

export default AuthComponent;
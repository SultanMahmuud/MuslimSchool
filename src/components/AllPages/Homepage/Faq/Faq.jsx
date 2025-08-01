'use client'
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/UI/button";

const FAQ = ({ current }) =>{
  const demoFaq = [
    {
      question: "এই কোর্সে কি কি শেখানো হয়?",
      answer:
        "এই কোর্সে কোরআন পাঠ, ইসলামিক শিক্ষা এবং বিভিন্ন ফিকহ বিষয় শেখানো হয়।",
    },
    {
      question: "কোর্সে ভর্তি হওয়ার জন্য কীভাবে আবেদন করব?",
      answer:
        "আমাদের ওয়েবসাইটে ‘শুরু করুন’ বাটনে ক্লিক করে আবেদন ফর্ম পূরণ করুন।",
    },
    {
      question: "ফ্রি ক্লাসগুলো কখন হবে?",
      answer:
        "প্রতিমাসের প্রথম সপ্তাহে ফ্রি ক্লাস আয়োজন করা হয়। বিস্তারিত জানার জন্য আমাদের ফ্রি ক্লাস পেজ দেখুন।",
    },
    {
      question: "কত দিন ধরে কোর্স চলবে?",
      answer: "কোর্সের মেয়াদ সাধারণত ৩ মাস থেকে ৬ মাস পর্যন্ত হয়।",
    },
    {
      question: "ক্লাসগুলো অনলাইনে হবে নাকি অফলাইনে?",
      answer: "আমাদের সব ক্লাস অনলাইনে হয়, তাই আপনি যেকোন জায়গা থেকে অংশ নিতে পারেন।",
    },
    {
      question: "কোর্স শেষে কি সার্টিফিকেট দেওয়া হয়?",
      answer: "হ্যাঁ, কোর্স সম্পন্ন হলে আমরা একটি সার্টিফিকেট প্রদান করি।",
    },
  ];

  const [expanded, setExpanded] = useState(null);
  const [name, setName] = useState("");
  const [filteredFaq, setFilteredFaq] = useState(demoFaq);

  // Limit items shown on homepage or all on FAQ page
  const itemsToShow = current ? demoFaq.length : 3;

  // Toggle accordion open/close
  const handleToggle = (question) => {
    setExpanded(expanded === question ? null : question);
  };

  // Filter FAQs by question or answer
  const filter = (e) => {
    const keyword = e.target.value.toLowerCase();
    setName(e.target.value);

    if (keyword === "") {
      setFilteredFaq(demoFaq);
    } else {
      const results = demoFaq.filter(
        (item) =>
          item.question.toLowerCase().includes(keyword) ||
          item.answer.toLowerCase().includes(keyword)
      );
      setFilteredFaq(results);
    }
  };

  return (
    <div className="pb-12 px-4 max-w-3xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold">
          <span className="text-primary">প্রায়ই </span> <span className="base1">জিজ্ঞেস করা প্রশ্ন</span>
        </h2>
        {!current && (
          <p className="base1 text-lg font-semibold mt-2 hind">
           সম্ভব্য সমস্ত প্রশ্ন এখানে দেওয়া আছে। যদি আপনি আপনার প্রয়োজনীয় প্রশ্ন খুঁজে না পান, দয়া করে আমাদের একটি ইমেইল করুন support@muslimschoool.com এই ইমেলে । আমরা যত তাড়াতাড়ি সম্ভব আপনার সাথে যোগাযোগ করবো।
          </p>
        )}
      </div>

      {!current && (
        <div className="flex items-center max-w-xl mx-auto mb-6 border border-gray-300 rounded-md px-3 py-2 bg-white">
          <BiSearch className="text-gray-400 mr-2 text-xl" />
          <input
            type="text"
            value={name}
            onChange={filter}
            placeholder="প্রশ্ন বা উত্তর সার্চ করুন"
            className="w-full focus:outline-none font-hind text-gray-900 text-base"
            fdprocessedid="rozu1w"
          />
        </div>
      )}

      <div>
        {filteredFaq.slice(0, itemsToShow).map((item) => (
          <div
            key={item.question}
            className="mb-4 border border-gray-200 rounded-lg shadow-sm"
          >
            <div
              onClick={() => handleToggle(item.question)}
              className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              aria-expanded={expanded === item.question}
            >
              <span className="text-gray-900 font-semibold text-base hind">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                  expanded === item.question ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {expanded === item.question && (
              <div className="p-4 border-t border-gray-200 text-gray-700 hind">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/frequently-asked-questions" className="inline-block">
          <Button
            type="button"
            className="flex items-center gap-2 bg-primary hover:bg-emerald-700 text-white font-semibold  px-20 py-6 rounded-lg transition text-lg"
          >
            আরও দেখুন <MdArrowRight className="text-xl" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FAQ;

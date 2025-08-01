"use client"

import { useState } from "react"
import { Button } from "@/components/UI/button"

const CourseFaq = ({ faq, setFaq }) => {
  const [faqCategory, setFaqCategory] = useState("")
  const [newFaq, setNewFaq] = useState({})

  const handleSubmit = () => {
    if (!newFaq.question || !newFaq.answer) return // optional validation

    const faqData = {
      category: faqCategory,
      ...newFaq,
    }
    setFaq([...faq, faqData])
    setNewFaq({})
  }

  return (
    <div className="p-4 w-full  mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-4">
          <input
            type="text"
            value={newFaq.question || ""}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
            placeholder="Question"
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={newFaq.answer || ""}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
            placeholder="Answer"
            rows={5}
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <Button
            onClick={handleSubmit}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white w-fit"
          >
            Submit
          </Button>
        </div>

        <div className="flex-1">
          {/* You can add category UI or FAQ list here */}
        </div>
      </div>
    </div>
  )
}

export default CourseFaq

"use client";

import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever, MdExpandMore } from "react-icons/md";
import AddFAQModal from "./AddFAQModal"
import EditFAQModal from "./EditFAQModal"
import AddCourseFaq from "../AddCourseFaq";

export default function EditFAQ({ faq, handleDeleteFaq, setFaq }) {
  const [index, setIndex] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [editable, setEditable] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openIdx, setOpenIdx] = useState(0); // Track which accordion is open

  const handleAddFaq = (idx) => {
    setIndex(idx);
    setOpenAdd(true);
  };

  const triggerAddFaq = (newfaq) => {
    const faq = [...faq];
    faq.splice(index + 1, 0, newfaq);
    setFaq(faq);
    setOpenAdd(false);
  };

  const handleEditFaq = (faq, idx) => {
    setEditable(faq);
    setIndex(idx);
    setOpenEdit(true);
  };

  const triggerEditFaq = (faq) => {
    const newFaq = faq.map((item, ind) => (ind === index ? faq : item));
    setFaq(newFaq);
    setOpenEdit(false);
  };

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="w-full">
      {faq?.map((faq, idx) => (
        <div key={idx} className="mb-2 rounded-md shadow-sm border border-gray-200">
          {/* Accordion Header */}
          <button
            onClick={() => toggleAccordion(idx)}
            className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md"
          >
            <span className="font-medium text-gray-800 text-base">{faq?.question}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditFaq(faq, idx);
                }}
                className="p-1 rounded hover:bg-gray-200"
              >
                <BiEdit size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddFaq(idx);
                }}
                className="p-1 rounded hover:bg-gray-200"
                title="Add a faq after it"
              >
                <AiOutlinePlusCircle size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFaq(idx);
                }}
                className="p-1 rounded hover:bg-red-100 text-red-600"
              >
                <MdDeleteForever size={18} />
              </button>
              <MdExpandMore
                className={`ml-2 transform transition-transform ${
                  openIdx === idx ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>
          </button>

          {/* Accordion Content */}
          {openIdx === idx && (
            <div className="px-4 pb-4 text-gray-600 text-sm">{faq?.answer}</div>
          )}
        </div>
      ))}

      {/* Modals */}
      <AddFAQModal open={openAdd} setOpen={setOpenAdd} triggerAddFaq={triggerAddFaq} />
      <EditFAQModal
        open={openEdit}
        setOpen={setOpenEdit}
        singleFaq={editable}
        triggerEditFaq={triggerEditFaq}
      />
   
        <AddCourseFaq faq={faq} setFaq={setFaq} />
  
    </div>
  );
}

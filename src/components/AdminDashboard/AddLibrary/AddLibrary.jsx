'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import CommonFileUpload from '@/components/Shared/FileUpload/CommonFileUpload';
// import { BookCatagory } from '../../../constants';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState('');
  const [Bookmainimg1, setBookMainImg1] = useState('');
  const [Bookmainimg2, setBookMainImg2] = useState('');
  const [Bookmainimg3, setBookMainImg3] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [inputFields, setInputFields] = useState(['']);
  const [faq, setFaq] = useState({ tab1: '', tab2: '', tab3: '', tab4: '' });

  const handleFAQChange = (tab, val) => {
    setFaq({ ...faq, [tab]: val });
  };

  const handleAuthorChange = (index, value) => {
    const fields = [...inputFields];
    fields[index] = value;
    setInputFields(fields);
  };

  const handleAddAuthor = () => {
    setInputFields([...inputFields, '']);
  };




  const onSubmit = async (data) => {
    const newdata = {
      ...data,
      description: value,
      faq,
      author: inputFields,
      image1: Bookmainimg1,
      image2: Bookmainimg2,
      image3: Bookmainimg3,
      fileLink,
      courseCategory: value,
    };

    try {
      await axios.post('https://muslim-schoool.onrender.com/books/create', newdata); // Replace with actual endpoint
     alert('Book added successfully!');
      reset();
    } catch (error) {
      alert('Failed to add book');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <input
          {...register('title')}
          type="text"
          placeholder="Book Title"
          className="w-full p-3 border rounded-md"
        />

        {/* Authors */}
        <div>
          <label className="block mb-1 font-medium">Authors</label>
          {inputFields.map((field, index) => (
            <input
              key={index}
              value={field}
              onChange={(e) => handleAuthorChange(index, e.target.value)}
              className="w-full p-2 mb-2 border rounded-md"
              placeholder={`Author ${index + 1}`}
            />
          ))}
          <button type="button" onClick={handleAddAuthor} className="text-sm text-blue-600">
            + Add Another Author
          </button>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <JoditEditor value={value} onChange={setValue} />
        </div>

        {/* FAQ Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['tab1', 'tab2', 'tab3', 'tab4'].map((tab, idx) => (
            <div key={tab}>
              <label className="block mb-1 font-medium">FAQ {idx + 1}</label>
              <JoditEditor
                value={faq[tab]}
                onChange={(val) => handleFAQChange(tab, val)}
              />
            </div>
          ))}
        </div>

        {/* Category */}
        <select {...register('courseCategory')} className="w-full p-3 border rounded-md">
          <option value="">Select Category</option>
          {/* {BookCatagory.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))} */}
        </select>

        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[setBookMainImg1, setBookMainImg2, setBookMainImg3].map((setter, idx) => (
            <div key={idx}>
              <label className="block mb-1 font-medium">Upload Image {idx + 1}</label>
             <CommonFileUpload url={setter} setUrl={setter} />

             
            </div>
          ))}
        </div>

        {/* File Upload
        <div>
          <label className="block mb-1 font-medium">Upload File</label>
         
        </div> */}

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-md transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;

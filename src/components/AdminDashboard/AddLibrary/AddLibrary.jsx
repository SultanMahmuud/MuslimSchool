"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import dynamic from "next/dynamic";
import CommonFileUpload from "@/components/Shared/FileUpload/CommonFileUpload";
// import { BookCatagory } from '../../../constants';

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState(""); // description
  const [Bookmainimg1, setBookMainImg1] = useState("");
  const [Bookmainimg2, setBookMainImg2] = useState("");
  const [Bookmainimg3, setBookMainImg3] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [inputFields, setInputFields] = useState([""]); // authors
  const [faq, setFaq] = useState({ tab1: "", tab2: "", tab3: "", tab4: "" });
  const [category, setCategory] = useState([]);
  const handleFAQChange = (tab, val) => {
    setFaq({ ...faq, [tab]: val });
  };

  const handleAuthorChange = (index, value) => {
    const fields = [...inputFields];
    fields[index] = value;
    setInputFields(fields);
  };

  const handleAddAuthor = () => {
    setInputFields([...inputFields, ""]);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length > 0) {
          setCategory(data.data[0].library); // directly save only courses
        }
      });
  }, []);

  const onSubmit = async (data) => {
    const newdata = {
      title: data.title,
      price: data.price,
      salePrice: data.salePrice,
      page: data.page,
      interactive: data.interactive,
      format: data.format,
      fileSize: data.fileSize,

      description: value,
      faq: faq.tab1 || faq.tab2 || faq.tab3 || faq.tab4, // pick first non-empty tab
      courseCategory: [data.courseCategory], // must be array

      author: inputFields
        .filter((a) => a.trim() !== "")
        .map((name) => ({
          id: crypto.randomUUID(),
          name,
          education: "",
          description: "",
          img: "",
        })),

      image1: Bookmainimg1,
      image2: Bookmainimg2,
      image3: Bookmainimg3,
      fileLink,
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book`, newdata);
      alert("Book added successfully!");
      reset();
    } catch (error) {
      alert("Failed to add book");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <input
          {...register("title")}
          type="text"
          placeholder="Book Title"
          className="w-full p-3 border rounded-md"
        />

        {/* Price / SalePrice / Page / Format / etc */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("price")}
            type="text"
            placeholder="Price"
            className="p-3 border rounded-md"
          />
          <input
            {...register("salePrice")}
            type="text"
            placeholder="Sale Price"
            className="p-3 border rounded-md"
          />
          <input
            {...register("page")}
            type="text"
            placeholder="Page Count"
            className="p-3 border rounded-md"
          />
          <input
            {...register("interactive")}
            type="text"
            placeholder="Interactive"
            className="p-3 border rounded-md"
          />
          <input
            {...register("format")}
            type="text"
            placeholder="Format"
            className="p-3 border rounded-md"
          />
          <input
            {...register("fileSize")}
            type="text"
            placeholder="File Size"
            className="p-3 border rounded-md"
          />
        </div>

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
          <button
            type="button"
            onClick={handleAddAuthor}
            className="text-sm text-blue-600"
          >
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
          {["tab1", "tab2", "tab3", "tab4"].map((tab, idx) => (
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
        <select
          {...register("courseCategory")}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Category</option>
          <select
            {...register("courseCategory")}
            className="w-full p-3 border rounded-md"
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </select>

        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[setBookMainImg1, setBookMainImg2, setBookMainImg3].map(
            (setter, idx) => (
              <div key={idx}>
                <label className="block mb-1 font-medium">
                  Upload Image {idx + 1}
                </label>
                <CommonFileUpload url={setter} setUrl={setter} />
              </div>
            )
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload File</label>
          <CommonFileUpload url={fileLink} setUrl={setFileLink} />
        </div>

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

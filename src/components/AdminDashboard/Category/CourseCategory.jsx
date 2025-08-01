"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react"; // Replacing DeleteIcon

const CourseCategory = ({ featured, texteld, featured__vis, button_form }) => {
  const { register, handleSubmit, reset } = useForm();

  const [category, setCategory] = useState([]);
  const [categoryItem, setCategoryItem] = useState("false");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`)
      .then((res) => res.json())
      .then((data) => setCategory(data.data.reverse()));
  }, [categoryItem]);

  const onSubmit = (data) => {
    const newData = { ...data };
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/course/62eeb3f4d83f3f2c7c28e9e0`,
        newData
      )
      .then(() => {
        reset();
        setCategoryItem("true");
      })
      .catch(() => {
        alert("error! something went wrong");
      });
  };

  const handleDeleteCours = (id) => {
    const data = {
      Id: "62eeb3f4d83f3f2c7c28e9e0",
    };
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/coursedelete/${id}`,
        data
      )
      .then((response) => {
        if (response.status === 201) {
          alert("Course Category deleted");
          setCategoryItem("true");
        }
      })
      .catch(() => {
        alert("error! something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side: Add New Category */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className={`${featured} text-lg`}>Add New Category</h2>

          <input
            type="text"
            {...register("category")}
            placeholder="Add Category"
            className={`mt-4 ${texteld} border border-gray-300 rounded px-3 py-2 w-full`}
          />

          <button type="submit" className={button_form}>
            Submit
          </button>
        </div>

        {/* Right side: Show Categories */}
        <div>
          {category[0]?.course.map(
            (e, index) =>
              e?.category?.length > 2 && (
                <div
                  key={index}
                  className="flex items-center gap-4 mb-2 bg-white p-2 rounded shadow"
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteCours(e?._id)}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-400 shadow bg-gray-100"
                  >
                    <Trash2 className="text-red-600 w-4 h-4" />
                  </button>

                  <p className={`${featured} text-sm`}>{e?.category}</p>
                </div>
              )
          )}
        </div>
      </div>
    </form>
  );
};

export default CourseCategory;

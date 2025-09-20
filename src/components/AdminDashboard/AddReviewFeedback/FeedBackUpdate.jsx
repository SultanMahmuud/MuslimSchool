"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import useUploads from "@/components/Hooks/useUpload";
import { toast } from "sonner";

const suggestTopics = [{ title: "ReviewPage" }, { title: "HomePage" }];

const FeedbackUpdate = ({ itemId }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { handleSubmits } = useUploads();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/getReview/${itemId}`
    )
      .then((res) => res.json())
      .then((data) => {
        reset(data); // populate form with review details
        setValue("reviewPersonImg", data?.reviewPersonImg || "");
      });
  }, [itemId, reset, setValue]);

  const img1 = (e) => {
    handleSubmits(e, (url) => {
      setValue("reviewPersonImg", url); // attach uploaded url to form
    });
  };

const onSubmit = (formData) => {
  axios
    .put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/${itemId}`,
      formData
    )
    .then(() => {
      toast.success("Feedback updated successfully");
      window.location.reload(); // 🔄 reload the page
    })
    .catch(() => {
      toast.error("Something went wrong");
    });
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-[#1B4D89] text-white">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Feedback</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Select Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">
              তোমার ফিডব্যাকের পেজ সিলেক্ট করো
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              {...register("showPage", { required: true })}
            >
              <option value="">Select a page</option>
              {suggestTopics.map((element, index) => (
                <option key={index} value={element.title}>
                  {element.title}
                </option>
              ))}
            </select>
          </div>

          {/* Text fields */}
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            placeholder="Person Name"
            {...register("personName", { required: true })}
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            placeholder="Batch Name"
            {...register("batchName", { required: true })}
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
          />
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Review"
            {...register("review", { required: true })}
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            placeholder="Rating"
            {...register("rating", { required: true })}
          />

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Upload Reviewer Image
            </label>
            <input onChange={img1} type="file" />
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#FCB23F] text-black hover:text-white">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackUpdate;

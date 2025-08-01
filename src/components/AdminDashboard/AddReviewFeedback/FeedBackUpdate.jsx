'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/UI/dialog';
import { Button } from '@/components/UI/button'; // shadcn button
import useUploads from '@/components/Hooks/useUpload';

const suggestTopics = [{ title: 'ReviewPage' }, { title: 'HomePage' }];

const FeedbackUpdate = ({ itemId }) => {
  const [ReviewDetails, setReviewDetails] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const { handleSubmits } = useUploads();
  const [showPage, setShowPage] = useState('');
  const [reviewPersonImg, setreviewPersonImg] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/getReview/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviewDetails(data);
        setreviewPersonImg(data?.reviewPersonImg);
      });
  }, [itemId]);

  const img1 = (e) => {
    handleSubmits(e, setreviewPersonImg);
  };

  const onSubmit = (data) => {
    const newData = {
      ...data,
      reviewPersonImg,
      showPage,
    };

    axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/${itemId}`, newData)
      .then(() => {
        toast('Update Feedback successfully');
        reset();
        setOpen(false);
      })
      .catch(() => {
        alert('error! something went wrong');
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
              value={showPage}
              onChange={(e) => setShowPage(e.target.value)}
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
            defaultValue={ReviewDetails.personName}
            {...register('personName', { required: true })}
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            placeholder="Batch Name"
            defaultValue={ReviewDetails.batchName}
            {...register('batchName', { required: true })}
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            placeholder="Location"
            defaultValue={ReviewDetails.location}
            {...register('location', { required: true })}
          />
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Review"
            defaultValue={ReviewDetails.review}
            {...register('review', { required: true })}
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            placeholder="Rating"
            defaultValue={ReviewDetails.rating}
            {...register('rating', { required: true })}
          />

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium">Upload Reviewer Image</label>
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

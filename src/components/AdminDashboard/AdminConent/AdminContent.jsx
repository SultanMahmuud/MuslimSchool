import useUpload from '@/components/Hooks/useUpload';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';



const Achievement = ({
  heading,
  light,

}) => {
  const [firstSelectedFatured, setfirstSelectedFatured] = useState('');
  const { handleSubmits } = useUpload();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const Newdata = {
      ...data,
      iconImg: firstSelectedFatured,
    };

    axios
      .post('https://muslim-schoool.onrender.com/achievement', Newdata)
      .then((res) => {
        if (res.status === 200) {
          alert('Add Blog successfully');
          reset();
        }
      })
      .catch(() => {
        alert('error! something went wrong');
      });
  };

  const img1 = (e) => {
    handleSubmits(e, setfirstSelectedFatured);
  };

  return (
    <div>
      <h2 className={`${heading}`}>Achievement...</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Left Inputs */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Title Field */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="title"
              className={`bg-white shadow px-3 py-1 text-sm font-medium rounded ${light}`}
            >
              Name
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter Title..."
              {...register('title', { required: true })}
              className="w-full border px-3 py-2 rounded outline-blue-500"
            />
          </div>

          {/* Number Field */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="number"
              className={`bg-white shadow px-3 py-1 text-sm font-medium rounded ${light}`}
            >
              Number
            </label>
            <input
              id="number"
              type="number"
              placeholder="Enter Number..."
              {...register('number', { required: true })}
              className="w-full border px-3 py-2 rounded outline-blue-500"
            />
          </div>
        </div>

        {/* Right Upload */}
        <div className="flex flex-col justify-between">
          <div>
            <label
              htmlFor="upload"
              className={`block bg-white shadow px-3 py-1 mb-2 w-full text-center rounded cursor-pointer ${light}`}
            >
              Add Image Icon
            </label>
            <input
              id="upload"
              type="file"
              onChange={img1}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {firstSelectedFatured && (
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Publish
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Achievement;

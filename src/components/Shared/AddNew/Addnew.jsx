"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Fileupload from "../FileUpload/FileUpload";
import { Input } from "@/components/UI/input";

const AddNew = ({ role }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [married, setMarried] = useState('Married');
  const [gender, setGender] = useState('Male');
  const [mfsMedium, setMfsMedium] = useState('Bkash');
  const [birthCertificate, setBirthCertificate] = useState('');
  const [NID, setNid] = useState('');
  const [passport, setPassport] = useState('');
  const [avatar, setAvatar] = useState('');

  const onSubmit = (data) => {
    const payload = {
      ...data,
      married,
      gender,
      mfsMedium,
      role,
      NID,
      birthCertificate,
      passport,
      avatar,
    };

    alert("Profile Updated Successfully");
    if (message?.data?.modifiedCount) {
      alert(`${role} updated`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <section>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input {...register('name')} placeholder="Name" />
          <Input {...register('fatherName')} placeholder="Father's Name" />
          <Input {...register('email')} placeholder="Email" required />
          <Input {...register('number')} placeholder="Phone Number" />
          <Input type="date" {...register('dob')} className="Input" />
          <Input {...register('nationality')} placeholder="Nationality" />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <select
            value={married}
            onChange={(e) => setMarried(e.target.value)}
            className="border p-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
          </select>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <Fileupload setUrl={setBirthCertificate} url={birthCertificate} label="Birth Certificate" />
          <Fileupload setUrl={setAvatar} url={avatar} label="Profile Image" />
          <Fileupload setUrl={setNid} url={NID} label="National ID" />
          <Fileupload setUrl={setPassport} url={passport} label="Passport" />
        </div>

        <textarea {...register('bio')} rows="4" placeholder="Bio" className="mt-4 w-full border p-2 rounded-md dark:bg-gray-800 dark:text-white" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Permanent Address</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input {...register('perCountry')} placeholder="Country" />
          <Input {...register('perDistrict')} placeholder="District" />
          <Input {...register('perThana')} placeholder="Thana" />
          <Input {...register('perPostCode')} placeholder="Post Code" />
        </div>
        <Input {...register('perAddressLine')} placeholder="Permanent Address Line" className="mt-4" />
        <Input {...register('currAddressLine')} placeholder="Current Address Line" className="mt-4" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input {...register('qual2')} placeholder="Qualification 1" />
          <Input {...register('qual3')} placeholder="Qualification 2" />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Department</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input {...register('Department')} placeholder="Department Name" />
          <Input type="date" {...register('joiningDate')} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Total Classes</h2>
        <Input {...register('totalClasses')} placeholder="Total Classes" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input {...register('mfsNumber')} placeholder="MFS Number" />
          <select
            value={mfsMedium}
            onChange={(e) => setMfsMedium(e.target.value)}
            className="border p-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
          </select>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Bank Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input {...register('bankName')} placeholder="Bank Name" />
          <Input {...register('bankAccountName')} placeholder="Account Name" />
          <Input {...register('bankAccountNum')} placeholder="Account Number" />
          <Input {...register('branchName')} placeholder="Branch Name" />
          <Input {...register('routingName')} placeholder="Routing Number" />
        </div>
      </section>

      {errors.exampleRequired && (
        <p className="text-red-500">This field is required</p>
      )}

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddNew;
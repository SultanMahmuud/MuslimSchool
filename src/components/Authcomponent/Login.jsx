'use client';
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Button } from "@/components/UI/button";
import { cn } from "@/lib/utils";

const Login = () => {

  const  user  = 'admin';

  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showInitialSection, setShowInitialSection] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.name) {
      const redirectPath = location.state?.from?.pathname || "/";
      // navigate(redirectPath);
    }
  }, [user,  location]);

  const onSubmitPass = (data) => {
   // TODO: Implement login logic here
    // dispatch(login({ email, password: data.password, number }));
  };

  const handleLogin = async () => {
    if (!inputValue.trim()) return setSnackbarMessage("ফোন নম্বর বা ইমেইল দিন");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;

    if (emailRegex.test(inputValue)) {
      setEmail(inputValue);
      setNumber("");
    } else if (phoneRegex.test(inputValue)) {
      setNumber(inputValue);
      setEmail("");
    } else {
      return setSnackbarMessage("ভ্যালিড ফোন নম্বর বা ইমেইল দিন");
    }

    try {
      const res = await fetch("https://muslim-schoool.onrender.com/otp/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputValue }),
      });

      const result = await res.json();

      if (result.success && result.exists) {
        setShowInitialSection(false);
        setShowPassword(true);
      } else {
        setSnackbarMessage("একাউন্ট খুঁজে পাওয়া যায়নি");
      }
    } catch (error) {
      setSnackbarMessage("সমস্যা হয়েছে, পরে চেষ্টা করুন");
    }
  };

  const handleChangeNumberEmail = () => {
    setShowInitialSection(true);
    setShowPassword(false);
    setInputValue("");
    setEmail("");
    setNumber("");
  };

  return (
    <div className="flex flex-col">
      <div className="w-full">
        {showInitialSection && (
          <div className="space-y-3">
            <label className="text-sm font-semibold">মোবাইল নাম্বার বা ইমেইল দিন</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-medium"
              placeholder="মোবাইল নাম্বার বা ইমেইল দিন"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={handleLogin} className="w-full">
              এগিয়ে যাই
            </Button>
            {snackbarMessage && (
              <p className="text-sm text-red-500 mt-2">{snackbarMessage}</p>
            )}
          </div>
        )}

        {showPassword && (
          <form
            className="space-y-3"
            onSubmit={handleSubmit(onSubmitPass)}
          >
            <input
              type="password"
              className={cn(
                "w-full border border-gray-300 rounded-md px-3 py-2 text-sm",
                errors.password && "border-red-500"
              )}
              placeholder="পাসওয়ার্ড দিন"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">Password is required</p>
            )}
            <Button type="submit" className="w-full">
              এগিয়ে যাই
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleChangeNumberEmail}
            >
              নাম্বার/ ইমেইল পরিবর্তন
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

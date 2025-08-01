
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// import { toast } from "react-toastify";
import { Button } from "@/components/UI/button";





const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginMethod, setLoginMethod] = useState("phone");
  const [step, setStep] = useState("initial");

  // const { user } = useSelector((state) => state.qawmiauth);
const user = 'admin'; // Placeholder for user state, replace with actual user state management
  useEffect(() => {
    if (user?.name) {
      const { state } = location;
      const redirectPath = state?.from?.pathname || "/";
     
    }
  }, [user]);

  const handleToggleLoginMethod = () => {
    setLoginMethod(loginMethod === "phone" ? "email" : "phone");
  };

  const sendOTP = async () => {
    const payload = loginMethod === "phone" ? { number } : { email };
    const endpoint =
      loginMethod === "phone"
        ? "/otp/send-otp"
        : "/email-otp/send";

    const res = await fetch(`https://muslim-schoool.onrender.com${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data?.user) return toast.error("Account already exists.");
    if (data.success) setStep("verify");
  };

  const verifyOTP = async () => {
    const payload = loginMethod === "phone" ? { number, otp } : { email, otp };
    const endpoint =
      loginMethod === "phone" ? "/otp/verify-otp" : "/verify/email";

    const res = await fetch(`https://muslim-schoool.onrender.com${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) setStep("register");
  };

  const onSubmitRegister = (data) => {
    // dispatch(
    //   registers({
    //     name: data.name,
    //     password: data.password,
    //     email,
    //     number,
    //   })
    // );
  };

  return (
    <div className="">
      <div className="w-full">
        {step === "initial" && (
          <>
            <label className="text-sm font-semibold text-gray-700 mb-1">
              {loginMethod === "phone" ? "ফোন নাম্বার দিন" : "ইমেল এড্রেস দিন"}
            </label>
            <input
              type={loginMethod === "phone" ? "text" : "email"}
              value={loginMethod === "phone" ? number : email}
              onChange={(e) =>
                loginMethod === "phone"
                  ? setNumber(e.target.value)
                  : setEmail(e.target.value)
              }
              placeholder={
                loginMethod === "phone"
                  ? "ফোন নাম্বার দিন"
                  : "ইমেল এড্রেস লিখুন"
              }
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none"
            />
            <Button onClick={sendOTP} className="w-full mb-2">
              এগিয়ে যাই 
            </Button>
            <Button
              variant="secondary"
              onClick={handleToggleLoginMethod}
              className="w-full"
            >
              {loginMethod === "phone"
                ? "দেশের বাইরে থেকে"
                : "ফোন নাম্বার দিয়ে লগ ইন করুন"}
            </Button>
          </>
        )}

        {step === "verify" && (
          <>
            <label className="text-sm font-semibold text-gray-700 mb-1">
              OTP দিন
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none"
            />
            <Button onClick={verifyOTP} className="w-full">
              এগিয়ে যাই 
            </Button>
          </>
        )}

        {step === "register" && (
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmitRegister)}
          >
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1">
                পুরো নাম
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="এখানে লিখুন"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1">
                পাসওয়ার্ড
              </label>
              <input
                {...register("password", { required: true })}
                type={passwordShown ? "text" : "password"}
                placeholder="পাসওয়ার্ড"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1">
                কনফার্ম পাসওয়ার্ড
              </label>
              <input
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="কনফার্ম পাসওয়ার্ড"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <Button type="submit" className="w-full">
              রেজিস্টার করুন 
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
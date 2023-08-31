import React, { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [istoken, setIsToken] = useState(false);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
    if (router.query.token) {
      setIsToken(true);
      setToken(router.query.token);
      setEmail(router.query.email);
    }
  }, [router.query]);

  const handleClick = async () => {
    const response = await fetch("/api/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const res = await response.json();
    // console.log(res);
    //If otp send successfully
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail('')
      return 
    }
      //In case of any error
      else {
      toast.error(res.message, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handlePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords should be same", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (newPassword.length < 5) {
      toast.error("Passwords should be of at least 5 characters", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const response = await fetch("/api/otpverification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword, token, email }),
    });
    const res = await response.json();
    // console.log(res);

    // Password changed successfully
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.replace("/login");
      return;
    }
    //In case of any error
    else {
      toast.error(res.message, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setNewPassword("");
      setConfirmPassword("");
      return;
    }
  };

  return (
    <>
      <section className="-mt-10 flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
          <div className="mb-4">
            <p className=" text-xl font-bold text-center">Forgot Password ?</p>
            <div className="text-center">
              <Link href={"/login"} className="text-pink-500 underline">
                or Log in
              </Link>
            </div>
          </div>
          {/* If user comes with link */}
          {!istoken && (
            <div>
              <div className="mt-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  type="text"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mt-2">
                <button
                  onClick={handleClick}
                  className="w-full py-4 bg-pink-600 hover:bg-pink-700 rounded text-sm font-bold text-gray-50 transition duration-200"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          {/* //If  user is on a forgot password page */}
          {istoken && (
            <div>
              <div>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 mb-2"
                  type="password"
                  value={newPassword}
                  placeholder="New Password"
                  required
                  min={5}
                />
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required
                  min={5}
                />
              </div>
              <div className="mt-2">
                <button
                  onClick={handlePassword}
                  className="w-full py-4 bg-pink-600 hover:bg-pink-700 rounded text-sm font-bold text-gray-50 transition duration-200"
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Forgot;

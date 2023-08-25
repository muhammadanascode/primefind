import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const myaccount = () => {
  const router = useRouter();

  //Function to fetch user data from api
  async function getUserdata() {
    const response = await fetch("/api/getUser", {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    //If api failed to fetched user data
    if (!res.success) {
      toast.warn(res.message, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     return 
    }
    setUserName(res.name);
    setEmail(res.email); 
  }

  useEffect(() => {
    //Checking whether user is logged in
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      getUserdata();
    }
  }, []);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  //Updating state values 
  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUserName(e.target.value);
    } else if (e.target.name === "newpassword") {
      setNewPassword(e.target.value);
    } else if (e.target.name === "confirmpassword") {
      setConfirmPassword(e.target.value);
    }
  };

  //Function to submit the form
  const handleSubmit = async (e) => {

    e.preventDefault();

    //If username is less than 3 characters
    if(!userName.length>2){
      toast.error("Username must be of 3 characters", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     return 
    }

    //If password length is less than 6 characters
    else if(!newPassword.length>5){
      toast.error("Password should contain 5 characters", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     return 
    }
    
    //If new password and confirm password arenot equal
    else if(newPassword!==confirmPassword){
      toast.error("New password and confirm password must be equal", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     return 
    }

    //If the user enter the input correctly
    const response = await fetch('/api/updateUser' , {
      method:"POST",
      body:JSON.stringify({name:userName , password:newPassword , email}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const res = await response.json()
    console.log(res);

    // If data successfully updated
    if(res.success){
      toast.success("Credentials updated successfully", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //Removing jwt token from local storage
      localStorage.removeItem('token')
      //Redirecting user to login page
      router.push('/login')

      return 
    }

    //if any error occured in updating data
    else{
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
      return 
    }
  };

  return (
    <div className="container w-1/2 mx-auto my-9">
      <h1 className="text-lg md:text-3xl font-bold text-center my-6">
        Revamp Account Data
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="johhn@gmail.com"
            readOnly
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            name="username"
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="newpassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New password
          </label>
          <input
            type="password"
            id="password"
            value={newPassword}
            name="newpassword"
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmpassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirmpassword"
            value={confirmPassword}
            name="confirmpassword"
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
          />
        </div>
        <div className="flex items-start mb-6"></div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update account
        </button>
      </form>
    </div>
  );
};

export default myaccount;

import React, { useState , useEffect  } from 'react'
import Link from 'next/link'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem("token")){
      router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    }
  },[])
  

  const handleChange = (e) => {

    if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name == "password") {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {

    try {

      e.preventDefault()
      let data = { email, password }
      // console.log(data);
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      // console.log((res));
      let response = await res.json()
      // console.log(response);
      setEmail("")
      setPassword("")


      if (response.success) {
        localStorage.setItem("token" , response.token)
        toast.success('Logged in successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.replace('/')
        }, 1100);
      }
      else {
        toast.error(response.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    }

    catch (error) {
      console.log("Error occured while submitting signup form" + error);
    }

  }

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-gray-100 ">
        <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
          <div className="mb-4">
            <p className="text-gray-600">Sign In</p>
            <h2 className="text-xl font-bold">Get into Prime Find</h2>
            <div className='text-center'>
              <Link href={'/signup'} className='text-pink-500 underline'>or Sign up</Link>
            </div>
          </div>
          <div>
            <input value={email} name='email' onChange={handleChange} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="email" placeholder="Email" />
          </div>
          <div>
            <input onChange={handleChange} value={password} name='password' className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Password" />
          </div>
          <div>
            <button onClick={handleSubmit} className="w-full py-4 bg-pink-600 hover:bg-pink-700 rounded text-sm font-bold text-gray-50 transition duration-200">Sign In</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center">
              <input type="checkbox" className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded" />
              <label htmlFor="comments" className="ml-2 text-sm font-normal text-gray-600">Remember me</label>
            </div>
            <div>
              <Link className="text-sm text-pink-600 hover:underline" href={'/forgot'}>Forgot password?</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import React, { useState , useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


export default function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router  = useRouter()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    }
  }, [])

  const handleChange = (e) => {

    if (e.target.name == "name") {
      setName(e.target.value)
    }
    else if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name == "password") {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {

    try {

      e.preventDefault()
      let data = { name, email, password }
      // console.log(data);
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      // console.log((res));
      let response = await res.json()
      // console.log(response);
      setName("")
      setEmail("")
      setPassword("")

      toast.success('Your account has been created', {
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

    catch (error) {
      console.log("Error occured while submitting signup form" + error);
    }

  }

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-gray-100">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
          <div className="mb-4">
            <p className="text-gray-600">Sign Up</p>
            <h2 className="text-xl font-bold">Join Prime Find</h2>
            <div className='text-center'>
              <Link href={'/login'} className='text-pink-500 underline'>or Login in</Link>
            </div>
          </div>
          <div>
            <input onChange={handleChange} value={name} name='name' className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text"
              placeholder="Enter your name" />
          </div>
          <div>
            <input onChange={handleChange} value={email} name='email' className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="email"
              placeholder="Email" />
          </div>
          <div>
            <input onChange={handleChange} value={password} name='password' className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password"
              placeholder="Password" />
          </div>
          <div>
            <button onClick={handleSubmit} className="w-full py-4 bg-pink-600 hover:bg-pink-700 rounded text-sm font-bold text-gray-50 transition duration-200">
              Sign Up</button>
          </div>
        </div>
      </section>
    </>
  )
}

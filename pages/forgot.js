import React from 'react'
import Link from 'next/link'
import { useEffect , useRouter } from 'react'

const Forgot = () => {

  const router  = useRouter()


  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    }
  }, [])

  return (
    <>
      <section className="-mt-10 flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
          <div className="mb-4">
            <p className=" text-xl font-bold text-center">Forgot Password ?</p>
            <div className='text-center'>
              <Link href={'/login'} className='text-pink-500 underline'>or Log in</Link>
            </div>
          </div>
          <div>
            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text"
              placeholder="Email" />
          </div>
          <div>
            <button className="w-full py-4 bg-pink-600 hover:bg-pink-700 rounded text-sm font-bold text-gray-50 transition duration-200">
              Continue</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Forgot
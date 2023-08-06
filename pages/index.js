import Head from "next/head"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Head>
        <title>PrimeFind-Discover the ultimate selection of prime products </title>
      </Head>
      <div className="flex justify-center my-4 mt-6">
        <h1 className = "mb-4 text-xl font-extrabold leading-none tracking-wide text-pink-700 md:text-3xl lg:text-3xl dark:text-white trackin ">DISCOVER THE PRIME PRODUCTS</h1>
      </div>
      <div className="flex justify-center mx-4" >
        <Image src='/landingimg.png' width={800} height={450} alt="img" />
      </div>
      
    </>

  )
}

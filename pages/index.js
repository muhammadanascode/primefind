import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          PrimeFind-Discover the ultimate selection of prime products
        </title>
      </Head>
      <div className="w-full m-auto mt-4 bg-gray-200 p-4 md:w-4/5 md:h-full md:flex">
        {" "}
        {/* Responsive classes */}
        <div className="md:w-1/2 md:pr-4 ">
          {" "}
          {/* Responsive padding */}
          <div className="p-4 md:p-8">
            <p className="mt-4 tracking-widest font-bold text-5xl md:text-6xl bg-white w-32 md:w-48 px-2 md:px-4">
              LET'S
            </p>
            <p className="mt-4  tracking-widest text-6xl md:text-6xl">EXPLORE</p>
            <p className="mt-4 font-bold tracking-widest text-5xl  bg-yellow-500 w-72 md:text-6xl ">
              UNIQUE
            </p>
            <p className="mt-4 tracking-widest text-6xl md:text-5xl">CLOTHES</p>
            <p className="mt-4 text-sm md:text-base">
            At PrimeFind, our ecommerce platform is your gateway to a world of exceptional products that cater to every facet of your needs and desires. We take you  to the latest fashion trends.
            </p>
          </div>
          <div className="flex text-center">
            <button className=" w-3/4 bg-pink-500 rounded-md text-white p-2  -mt-4 hover:bg-pink-700">
              <Link href={"/tshirts"}>Shop Now</Link>
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          {/* Image */}
          <Image className="mt-2" src={"/girl2.png"} width={480} height={200} alt="img" />
        </div>
      </div>
    </>
  );
}

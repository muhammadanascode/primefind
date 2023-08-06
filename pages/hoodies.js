import React from 'react'
import Link from 'next/link'



export default function Hoodies({ product }) {
  // console.log(product);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">

        <div className="flex flex-wrap -m-4 ">

          {Object.keys(product).length > 0 ? Object.keys(product).map((item) => {
            return <div key={product[item]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full ">
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product[item].img} />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Category: {product[item].category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{product[item].title}</h2>
                <div className='mt-1'>

                  {product[item].size.includes('S') && <span className='border border-gray-600 px-1 mx-1'> S</span>}
                  {product[item].size.includes('M') && <span className='border border-gray-600 px-1 mx-1'>M</span>}
                  {product[item].size.includes('L') && <span className='border border-gray-600 px-1 mx-1'>L</span>}
                  {product[item].size.includes('XL') && <span className='border border-gray-600 px-1 mx-1'>XL</span>}
                  {product[item].size.includes('XXL') && <span className='border border-gray-600 px-1 mx-1'>XXL</span>}
                </div>

                <div className='mt-1'>

                  {product[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {product[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {product[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {product[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {product[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black-500 rounded-full w-6 h-6 focus:outline-none"> </button>}
                </div>

                <p className="mt-1">Price: RS {product[item].price}</p>
                <Link href={`/product/${product[item].slug}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View More...
                </button> </Link>
              </div>
            </div>
          }) : <p>No Items available</p>
          }

        </div>

      </div>

    </section>
  )
}

export async function getServerSideProps() {
  try {
    // Fetch data from external API with the desired category as a query parameter
    const category = 'Hoodie';
    const apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/product/tshirt?category=${category}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    // Pass data to the page via props
    return { props: { product: data } };
  } catch (error) {
    console.log("Error occurred in fetching API of hoodies: " + error);
    // You may also want to handle errors and return an error prop, so the page can display an error message.
    return { props: { error: "An error occurred while fetching data." } };
  }
}

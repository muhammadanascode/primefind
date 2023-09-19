import React from "react";
import Link from "next/link";

export default function watch({ product }) {
  // console.log(product);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 ">
          {product.success ? (
            product.products.map((item) => {
              return (
                <div
                  className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg hover:shadow-pink-300 hover:cursor-pointer  "
                  key={item._id}
                >
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-contain object-center max-w-full max-h-full w-full h-auto block"
                      src={item.img}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      Category: {item.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <div className="mt-1">
                      {item.color.includes("red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("green") && (
                        <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("yellow") && (
                        <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("purple") && (
                        <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("gray") && (
                        <button className="border-2 border-gray-300 ml-1 bg-gray-800 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>
                    <p className="mt-1">Price: {item.price}</p>
                    <Link href={`/product/${item.slug}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        View More...
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch data from external API
    const category = "watches";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/product/watch/?category=${category}`
    );
    const data = await res.json();
    // Pass data to the page via props
    return { props: { product: data } };
  } catch (error) {
    console.log("Error occured in fetching api of tshirts " + error);
  }
}

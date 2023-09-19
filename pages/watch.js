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
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-2xl " key={item._id}>
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
                    <p className="mt-1">Price: {item.price}</p>
                    <Link href={"/product/watch"}>
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

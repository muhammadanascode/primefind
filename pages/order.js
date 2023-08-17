import NotFoundPage from "@/components/404";
import order from "@/model/order";
import Image from "next/image";
import { func } from "prop-types";
import React from "react";

const Order = ({ total  , product }) => {
  // console.log(product);
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                PRIME FIND
              </h2>
              <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">
                Order ID : {product.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Your Order has been placed successfully.
              </p>
              <div className="flex border-t border-gray-200 py-2">
                <span className=" font-semibold text-gray-900">Item</span>
                <span className="font-semibold ml-auto text-gray-900">
                  Quantity
                </span>
                <span className="font-semibold ml-auto text-gray-900">
                  Price
                </span>
              </div>
              {Object.keys(product.products).length > 0 ? (
                Object.keys(product.products).map((item) => {
                  return (
                    <div
                      key={product.products[item].name}
                      className="flex border-t border-gray-200 py-2"
                    >
                      <span className="text-gray-500">
                        {product.products[item].name}
                      </span>
                      <span className="ml-auto text-gray-900">
                        {product.products[item].qty}
                      </span>
                      <span className="ml-auto text-gray-900">
                        {product.products[item].price}
                      </span>{" "}
                    </div>
                  );
                })
              ) : (
                <p>Nothing to display</p>
              )}

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal ₹{total}
                </span>
                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Track Order
                </button>
              </div>
            </div>
            <Image
              alt="ecommerce"
              width={400}
              height={200}
              className="lobject-cover object-center rounded"
              src="/cart1.png"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;

export async function getServerSideProps(context) {
  try {
    const Order = await order.findOne({ orderId: context.query.id });
    // console.log(Order);
    let totalQuantity = 0;
    for (let item in Order.products) {
      totalQuantity += Order.products[item].price;
    }
    return {
      props: {
        product: JSON.parse(JSON.stringify(Order)),
        total: JSON.parse(JSON.stringify(totalQuantity)),
      },
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      notFound: true, // This will trigger the 404 page
    };
  }
}

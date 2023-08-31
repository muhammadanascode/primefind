import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const orders = ({}) => {
  // console.log(data);
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  async function fetchOrderS() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/myorders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      }
    );
    const res = await response.json();
    // console.log(res);
    setOrders(res.Orders);
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchOrderS();
    }
  }, []);

  return (
    <div className="h-screen container m-auto mt-6">
      <h1 className="font-bold text-4xl text-center mb-8 text-pink-700">
        My Orders
      </h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID#
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
            </tr>
          </thead>

          <tbody>
            {orders
              ? orders.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.orderId}
                    </td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.amount}</td>
                    <td className="px-6 py-4">
                      <Link href={`/order?id=${item.orderId}`}>Details</Link>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody> 
        </table>
      </div>
    </div>
  );
};

export default orders;

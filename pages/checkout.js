import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";

export default function Checkout({
  cart,
  addToCart,
  removeFromCart,
  subtotal,
}) {
  // States for payment Details
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  //Onchange function to capture the value of every input
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "mobile-number") {
      setMobileNumber(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "card-number") {
      setCardNumber(e.target.value);
    } else if (e.target.name === "expiry-date") {
      setExpiryDate(e.target.value);
    } else if (e.target.name === "cvc") {
      setCvc(e.target.value);
    }
  };

  //Making Object of Card Details
  const cardDetails = {
    cardNumber,
    expiryDate,
    cvc,
  };

  //Formatting date according to the documentation of JazzCash
  function formatDateToyyyyMMddHHmmss(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is month 0, so add 1 and pad with leading zero if necessary
    const day = String(date.getDate()).padStart(2, "0"); // Pad day with leading zero if necessary
    const hours = String(date.getHours()).padStart(2, "0"); // Pad hours with leading zero if necessary
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Pad minutes with leading zero if necessary
    const seconds = String(date.getSeconds()).padStart(2, "0"); // Pad seconds with leading zero if necessary

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  // CheckOut Functionality
  const handleCheckOut = async () => {
    //Fetching Api from backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardDetails,
          subtotal,
          orderID: Math.floor(Math.random() * 100000).toString(),
          description: "I'm paying to purchase a product",
          email,
          mobileNumber,
          time: formatDateToyyyyMMddHHmmss(new Date()),
        }),
      }
    );
    //Converting response to json
    const res = await response.json();
    console.log(res);
    // setName("");
    // setEmail("");
    // setMobileNumber("");
    // setCardNumber("");
    // setCvc("");
    // setExpiryDate("");
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center bg-pink-700 p-2  text-white rounded-lg">
          CHECK OUT - DETAILS
        </h1>

        {/* <!-- Shipping Address Section --> */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 text-pink-800 underline">
            Shipping Address
          </h2>
          <div className="bg-white rounded p-4 shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                id="address"
                name="email"
                value={email}
                type="email"
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              ></input>
            </div>
            <div className="mb-4">
              <label htmlFor="mobile-number" className="block font-medium">
                Mobile Number
              </label>
              <input
                type="number"
                id="city"
                name="mobile-number"
                value={mobileNumber}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            {/* <!-- Add more fields like country, zip code, etc. --> */}
          </div>
        </div>

        {/* <!-- Payment Details Section --> */}
        <div>
          <h2 className="text-lg font-bold mb-2 text-pink-800 underline">
            Payment Details
          </h2>
          <div className="bg-white rounded p-4 shadow-md">
            <div className="mb-4">
              <label htmlFor="card-number" className="block font-medium">
                Card Number
              </label>
              <input
                type="text"
                id="card-number"
                name="card-number"
                onChange={handleChange}
                value={cardNumber}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="expiry-date" className="block font-medium">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiry-date"
                name="expiry-date"
                value={expiryDate}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cvc" className="block font-medium">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                value={cvc}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* <!-- Place Order Button --> */}
        <div className="mt-6">
          <button
            onClick={handleCheckOut}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Reviewing Cart again Before checkout */}
      <div className="w-[90vw] sm:w-1/2 mx-auto mt-10">
        <h1 className="text-xl sm:text-3xl text-center font-semibold">
          Review Your Cart
        </h1>
        <div className="w-full sm:w-1/2 mx-auto my-5 sideCart h-1/3 bg-pink-100 p-10">
          <h2 className="font-bold text-xl">Shopping Cart</h2>
          <ol className="list-decimal">
            {Object.keys(cart).length > 0 ? (
              Object.keys(cart).map((item) => {
                return (
                  <li key={item}>
                    <div className="item flex my-5">
                      <div className="w-2/3 font-semibold flex items-center justify-center">
                        {cart[item].name}({cart[item].size}/{cart[item].variant}
                        )
                      </div>
                      <div className="flex font-semibold items-center justify-center w-1/3 text-6xl">
                        <AiFillMinusCircle
                          onClick={() => {
                            removeFromCart(
                              item,
                              1,
                              "Karachi",
                              cart[item].price,
                              cart[item].title,
                              cart[item].size,
                              cart[item].variant
                            );
                          }}
                          className="text-pink-600 cursor-pointer"
                        />
                        <span className="mx-4 text-sm">{cart[item].qty}</span>
                        <AiFillPlusCircle
                          onClick={() => {
                            addToCart(
                              item,
                              1,
                              "Karachi",
                              cart[item].price,
                              cart[item].title,
                              cart[item].size,
                              cart[item].variant
                            );
                          }}
                          className="text-pink-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="my-2 font-semibold">No items in the cart</p>
            )}
          </ol>
          <p className="font-semibold">Subtotal: ₹{subtotal}</p>
        </div>
      </div>
    </>
  );
}

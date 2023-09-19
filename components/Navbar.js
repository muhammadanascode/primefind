import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar({
  Logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
}) {


  const router = useRouter()
  const inputRef = useRef();
  const [dropDown, setDropDown] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogin(true);
    }
  }, [router.query]);

  const toggleCart = () => {
    if (inputRef.current.classList.contains("translate-x-full")) {
      inputRef.current.classList.remove("translate-x-full");
      inputRef.current.classList.add("translate-x-0");
    } else if (!inputRef.current.classList.contains("translate-x-full")) {
      inputRef.current.classList.remove("translate-x-0");
      inputRef.current.classList.add("translate-x-full");
    }
  };

  return (
    <>
      {/* Navbar */}

      <div className="w-full flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md shadow-pink-300 sticky bg-white top-0 z-10">
        <div className="logo mx-5">
          <Link href={"/"}>
            <Image
              alt="img"
              className="cursor-pointer"
              src="/Tshirt.png"
              width={150}
              height={60}
            />
          </Link>
        </div>
        <div className="nav ml-10">
          <ul className="flex items-center space-x-6 font-bold text-sm  ">
            <Link href={"/tshirts"}>
              {" "}
              <li className="hover:text-pink-600">T-shirts</li>
            </Link>
            <Link href={"/hoodies"}>
              {" "}
              <li className="hover:text-pink-600">Hoodies</li>
            </Link>
            <Link href={"/watch"}>
              {" "}
              <li className="hover:text-pink-600">Watches</li>
            </Link>
            <Link href={"/stickers"}>
              <li className="hover:text-pink-600">Stickers</li>
            </Link>
          </ul>
        </div>

        {/* SideCart */}

        <div className="cart absolute right-0 mx-5 top-6 cursor-pointer flex ">
          {!login ? (
            <button className="bg-pink-600 px-2 py-1 rounded-md text-white hover:bg-pink-700">
              <Link href={"/login"}>Login</Link>
            </button>
          ) : (
            <MdAccountCircle
              onMouseEnter={() => setDropDown(true)}
              className="mx-2 text-xl md:text-2xl "
            />
          )}
          {dropDown ? (
            <div
              onMouseLeave={() => setDropDown(false)}
              className="absolute top-6 right-0 mt-2 w-40 bg-pink-600 text-white rounded shadow-md"
            >
              <ul className="py-2">
                <Link href={"/myaccount"}>
                  <li className="px-4 py-2 hover:bg-pink-400">Account</li>
                </Link>
                <Link href={"/orders"}>
                  <li className="px-4 py-2 hover:bg-pink-400">My Orders</li>
                </Link>
                <li onClick={Logout} className="px-4 py-2 hover:bg-pink-400">
                  Logout
                </li>
              </ul>
            </div>
          ) : null}
          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="mx-2 text-xl md:text-2xl "
          />
        </div>
        <div
          ref={inputRef}
          className="w-76 sideCart h-[100vh] fixed md:absolute top-0 right-0 bg-pink-100 p-10 transform transition-transform translate-x-full z-20 max-w-2xl:w-full "
        >
          <h2 className="font-bold text-xl">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-600"
          >
            <AiOutlineClose />
          </span>
          <ol className="list-decimal">
            {/* mapping Cart Items */}
            {Object.keys(cart).length > 0 ? (
              Object.keys(cart).map((item) => {
                return (
                  <li key={item}>
                    <div className="item flex my-5">
                      <div className="w-2/3 font-semibold flex items-center justify-center">
                        {cart[item].name} ( {cart[item].size} /{" "}
                        {cart[item].variant} )
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
                              cart[item].color
                            );
                          }}
                          className=" text-pink-600 cursor-pointer"
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
                              cart[item].color
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
          {/* Checking validity of buttons */}
          {Object.keys(cart) != 0 ? (
            <div className="flex ">
              <Link
                href={localStorage.getItem("token") ? "/checkout" : "/login"}
              >
                {" "}
                <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold my-4 py-2 px-4 rounded flex mx-2">
                  CheckOut
                </button>{" "}
              </Link>
              <button
                onClick={clearCart}
                className="bg-pink-500 hover:bg-pink-700 my-4 text-white font-bold py-2 px-4 rounded flex mx-2"
              >
                Clear Cart
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

import { useRouter } from "next/router";
import React, { useState ,useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import {  toast } from "react-toastify";
import jwt_decode from "jwt-decode";


const checkout = ({ subtotal, clearCart, cart, handlePayment }) => {
  const router = useRouter();
  
  //email State
  const[email,setEmail] = useState("")

  useEffect(() => {

    //Fetching user's Email from jwt token
    if(localStorage.getItem('token')){
     const token = localStorage.getItem('token')
     const decodedToken = jwt_decode(token)
     setEmail(decodedToken.email)
    }
    //if token doesnot exist
    else{
      router.push('/login')
    }

  }, [])
  
   //Handling CheckOut functionality
  const handleCheckOut = async (paymentInfo) => {
    // console.log(paymentInfo);

    const obj = {
      email: paymentInfo.email,
      orderId: paymentInfo.id,
      products: cart,
      address: paymentInfo.card.address_line1,
      amount: subtotal,
      status: "Pending",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const response = await res.json();
    console.log(response);

    if (response.success) {
      handlePayment(paymentInfo);
      clearCart();
      router.push(`/order?id=${paymentInfo.id}`);
    }

    toast.error(response.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  };

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <StripeCheckout
          className="mx-10 mt-8"
          name="Prime Find"
          description="A ecommerce store for premium products"
          image="/Tshirt.png"
          stripeKey={process.env.NEXT_PUBLIC_PUBLISHABLE_KEY}
          token={(paymentInfo) => handleCheckOut(paymentInfo)}
          billingAddress={true}
          shippingAddress={true}
          amount={subtotal * 100}
          zipCode={true}
          currency="PKR"
          email={email}
        />
      </div>
    </>
  );
};

export default checkout;

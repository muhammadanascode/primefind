import { useRouter } from "next/router";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const checkout = ({ subtotal, cart }) => {
  const router = useRouter();

  //Handling CheckOut functionality
  const handleCheckOut = async (paymentInfo) => {
    console.log(paymentInfo);

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

    router.push("/order");
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
        />
      </div>
    </>
  );
};

export default checkout;

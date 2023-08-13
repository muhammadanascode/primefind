import { useRouter } from "next/router";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const checkout = ({ subtotal }) => {

  const router = useRouter()
  const handleCheckOut = (paymentInfo)=>{
  //  console.log(paymentInfo);
  router.push('/order')

  }

  return (
    <>
      <div className="flex justify-center items-center mt-10">
          <StripeCheckout
           className = "mx-10 mt-8" 
           name="Prime Find"
           description="A ecommerce store for premium products"
           image="/Tshirt.png"
            stripeKey={process.env.NEXT_PUBLIC_PUBLISHABLE_KEY}
            token={(paymentInfo)=>handleCheckOut(paymentInfo)}
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

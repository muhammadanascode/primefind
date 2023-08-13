import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer"
import '@/styles/globals.css'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [cart, setCart] = useState({})
  const [subtotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const [progress, setProgress] = useState(0)


  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(50)
    })
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error);
      localStorage.clear()
    }
    const token = localStorage.getItem("token")
    if (token) {
      setUser({ value: token })
      setKey(Math.random())
    }
  }, [router.query])


  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0
    let keys = Object.keys(myCart);

    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    // console.log(subt);
    setSubTotal(subt)

  }

  const addToCart = (itemCode, qty, city, price, name, size, variant,img) => {

    // console.log("Add to cart");
    let newCart = cart
    console.log(cart);
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, city, price, name, size, variant,img }
      // console.log("Cart");
    }

    toast.success('Item added to cart successfully', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setCart(newCart)
    // console.log(newCart);
    saveCart(newCart)
  }

  const removeFromCart = (itemCode, qty, city, price,
    name, size, variant) => {

    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    toast.success('Item removed from cart successfully', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = async () => {
    try {

      setCart({})
      saveCart({})

    } catch (error) {
      console.log(error);
    }
  }

  const Logout = () => {
    localStorage.removeItem("token")
    setUser({ value: null })
    setKey(Math.random())
    toast.success('You are Logged Out successfully', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    }, 600);

  }

  return (
    <>

      <LoadingBar
        color='#f70a71'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />

      <Navbar Logout={Logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
          <Component cart={cart} addToCart={addToCart} removeFromCart=
            {removeFromCart} clearCart={clearCart} subtotal={subtotal}  {...pageProps} />

      <Footer />
    </>
  )

}

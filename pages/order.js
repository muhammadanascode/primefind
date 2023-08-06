import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Order = ({ subtotal, cart }) => {
    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">PRIME FIND</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4"> Order ID - 8795864</h1>
                            <p className="leading-relaxed mb-4">Your Order has been placed successfully.</p>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className=" font-semibold text-gray-900">Item</span>
                                <span className="font-semibold ml-auto text-gray-900">Quantity</span>
                                <span className="font-semibold ml-auto text-gray-900">Price</span>
                            </div>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">Mug</span>
                                <span className="ml-auto text-gray-900">1</span>
                                <span className="ml-auto text-gray-900">499</span>
                            </div>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">T-shirt</span>
                                <span className="ml-auto text-gray-900">1</span>
                                <span className="ml-auto text-gray-900">510</span>
                            </div>
                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span className="text-gray-500">Hoodie</span>
                                <span className="ml-auto text-gray-900">1</span>
                                <span className="ml-auto text-gray-900">1500</span>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">Subtotal ₹{subtotal}</span>
                                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Order
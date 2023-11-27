import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import { useDispatch, useSelector } from "react-redux";
import {
    deleteItem,
} from "../store/slices/amazonSlice";
import { Link, useNavigate } from 'react-router-dom';
import { amazon } from '../assets';


const CheckOut = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.amazonReducer.products);
    const navigate = useNavigate();
    const [totalAmt, setTotalAmt] = useState("");
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('email');
    const address = localStorage.getItem('address');
    const city = localStorage.getItem('city');
    const country = localStorage.getItem('country');
    const phone = localStorage.getItem('phone');
    const cardInfo = localStorage.getItem('cardInfo');

    useEffect(() => {
        let price = 0;
        products.forEach((item) => {
            price += item.price * item.quantity;
        });
        setTotalAmt(price.toFixed(2));
    }, [products]);

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('email');
        const address = localStorage.getItem('address');
        const city = localStorage.getItem('city');
        const country = localStorage.getItem('country');

        if (!userName || !userEmail) {
            // If user credentials do not exist, navigate to the payment component
            navigate('/payment');
        }
    }, [navigate]);

    return (
        <>
            <Link to="/"><img src={amazon} alt="logo" width={300} /></Link>
            <div className='h-scree bg-white'>
                {/* the address */}
                <div className='grid grid-cols-12'>
                    <div className='col-span-2'>
                        <h1 className='text-xl font-bold'>Delivery Adress</h1>
                    </div>
                    <div className='col-span-10 pr-5 pt-5'>
                        <h className='text-lg block my-2 ml-6'>{userName}</h>
                        <h className='text-lg block my-2 ml-6'>{address}</h>
                        <h className='text-lg block my-2 ml-6'>{city}</h>
                    </div>
                </div>
                {/* the cart items */}
                <div className='grid grid-cols-12'>
                    <div className='col-span-2'>
                        <h1 className='text-xl font-bold'>Review Items and delivery</h1>
                    </div>
                    <div className='col-span-10'>
                        {products.map((item) => (
                            <div
                                key={item.id}
                                className="w-full border-b-[1px] border-b-gray-300 p-4 md:p-0 md:py-4 flex items-center gap-6"
                            >
                                <div className="w-full md:w-2/5 xl:w-1/5">
                                    <img
                                        className="w-full h-44 object-contain"
                                        src={item.image}
                                        alt="productImg"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-2 xl:gap-1">
                                    <h2 className="font-semibold text-lg">{item.title}</h2>
                                    <p className="xl:pr-10 text-sm">{item.description}</p>
                                    <p className="text-base">
                                        Unit Price:{" "}
                                        <span className="font-semibold">EGP {item.price}.00</span>
                                    </p>

                                    <button
                                        onClick={() => dispatch(deleteItem(item.id))}
                                        className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300"
                                    >
                                        Delete Item
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* the payment method */}
                <div className='containr w-full'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-2'>
                            <h1 className='text-xl font-bold'>Payment Method</h1>
                        </div>
                        <div className='col-span-10'>
                            <h1 className=' my-5'>Your credit Card number</h1>
                            <div className="">

                                <label className="text-sm text-gray-600 label-inline" htmlFor="card_details">Card Number</label>
                                <input
                                    value={cardInfo}
                                    className="w-full px-2 py-2 text-gray-700 bg-gray-300 rounded" id="card_details"
                                    name="card_details" type="text"
                                    readOnly
                                    placeholder="Card Number MM/YY CVC"
                                    aria-label="Card Details" />

                            </div>
                            <div className='bg-white p-5'>
                                <p className="font-semibold px-6 py-1 flex items-center">
                                    Subtotal:&nbsp; <span className="text-lg font-bold">EGP {totalAmt}</span>
                                </p>
                                {/* <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3">
                                    Buy now
                                </button> */}
                                <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3">
                                    <PaypalButton product={products} />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CheckOut;
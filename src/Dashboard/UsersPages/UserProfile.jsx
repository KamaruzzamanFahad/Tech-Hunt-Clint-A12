import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFrom from './CheckoutFrom';
import { loadStripe } from "@stripe/stripe-js";
import usePayment from '../../hooks/usePayment';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_PK)
const UserProfile = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiousSecure()
    const [payment, refetch] = usePayment()
    const [modalcode, setmodalcode] = useState(0)

    if (payment.email == user.email) {
        closeModal()
    }
    function closeModal() {
        if (modalcode == 1) {
            const modal = document.getElementById('my_modal_4');
            modal.close()
            setmodalcode(0)
        }
    }
    const openmodal = () => {
        document.getElementById('my_modal_4').showModal()
        setmodalcode(1)
    }
    return (
        <div className='w-full md:ml-16 lg:p-40'>
            <Helmet>
                <title>My Profile</title>
            </Helmet>
            <div className='flex flex-col bg-[#E2FBFF] justify-center items-center p-20 py-40 w-full'>
                <img src={user.photoURL} alt="" />
                <h1 className='text-center text-3xl sm:text-5xl'>{user.displayName}</h1>
                <p>{user.email}</p>
                {
                    payment && payment?.email == user.email ? <p className='font-bold text-[#000000bd]'>Subscription Status: <span className='text-black'>Verified</span></p> : payment &&
                        <button onClick={openmodal} className='bg-black text-white mt-3'>Membership Subscribe $10</button>
                }

                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">

                        <div className='w-full flex justify-center items-center py-40'>
                            <Elements stripe={stripePromise}>
                                <CheckoutFrom></CheckoutFrom>
                            </Elements>
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default UserProfile;
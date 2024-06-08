import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import usePayment from '../../hooks/usePayment';

const CheckoutFrom = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, seterror] = useState('');
    const [clientSecret, setclientSecret] = useState('')
    const [tranjectionid, settranjectionid] = useState('')
    const axiosSecure = useAxiousSecure();
    const { user, UpdatePayment } = useContext(AuthContext)
    const price = 10;
    const [payment, refetch] = usePayment()
    const goto = useNavigate()
    console.log(price)
    useEffect(() => {
        if (price != 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setclientSecret(res.data.clientSecret)
                    console.log('clint seccccccccccccc', res.data.clientSecret)
                })
        }
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('error : ', error)
            seterror(error.message)
        } else {
            console.log('payment methode: ', paymentMethod)
            seterror('')
        }


        // conferm payment
        const { paymentIntent, erra } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email,
                    name: user.displayName,

                }
            }
        })
        if (erra) {
            console.log('error is: ', erra)
        }
        else {
            console.log('payment intent: ', paymentIntent)
            if (paymentIntent.status == 'succeeded') {
                settranjectionid(paymentIntent.id)


                const paymentdoc = {
                    email: user.email,
                    price: price,
                    date: new Date(),
                    tranjectionid: paymentIntent.id,
                }
                axiosSecure.post('/payment', paymentdoc)
                    .then(res => {
                        refetch()
                    })
            }
        }
    }
    return (

        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type='submit' disabled={!stripe || !clientSecret} className='btn bg-purple-600 w-60'>Pay</button>
            <p className='text-red-500'>{error}</p>
            {
                tranjectionid ? <p className='text-green-500'>{tranjectionid}</p> : ''
            }
        </form>

    );
};

export default CheckoutFrom;
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import useAxiousSecure from '../../hooks/useAxiousSecure';

const ManageCoupons = () => {
    const { user } = useContext(AuthContext)
    const [reload, setreload] = useState(0)
    const [cupondata, setcupondata] = useState([])
    const [edit, setedit] = useState(null)
    const axiosSecure = useAxiousSecure()
    const handlecupon = (event) => {
        event.preventDefault();
        const fromma = event.target;
        const CouponCode = fromma.CouponCode.value;
        const ExpiryDate = formatDate(selectedDate);
        const CouponDescription = fromma.CouponDescription.value;
        const DiscountAmount = fromma.DiscountAmount.value;
        const item = { CouponCode, ExpiryDate, CouponDescription, DiscountAmount }
        axiosSecure.post(`/cupon-add`, item)
            .then(res => {
                if (res.data.insertedId) {
                    setreload(Math.random())
                    fromma.reset()
                    Swal.fire({
                        title: "Good job!",
                        text: "Your Coupon has been added!",
                        icon: "success"
                    });
                }

            })
    }

    useEffect(() => {
        axiosSecure.get('/cupon')
            .then(res => setcupondata(res.data))
    }, [reload])

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const formatDate = (date) => {
        return format(date, 'd MMM yyyy').toUpperCase();
    };

    const handledelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deletecopun?id=${id}`)
                    .then(res => {
                        setreload(Math.random())
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleedit = (item) => {
        setedit(item)
        setSelectedDate(item.ExpiryDate)
        document.getElementById('my_modal_4').showModal()
    }

    const editsubmt = (event) => {
        event.preventDefault();
        const fromma = event.target;
        const CouponCode = fromma.CouponCode.value;
        const ExpiryDate = formatDate(selectedDate);
        const CouponDescription = fromma.CouponDescription.value;
        const DiscountAmount = fromma.DiscountAmount.value;
        const item = { CouponCode, ExpiryDate, CouponDescription, DiscountAmount }
        axiosSecure.patch(`/cupon-update?id=${edit?._id}`, item)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    setreload(Math.random())
                    setedit(null)
                    const modal = document.getElementById('my_modal_4');
                    modal.close()
                    Swal.fire({
                        title: "Good job!",
                        text: "Your Coupon has been Updated!",
                        icon: "success"
                    });

                }

            })
    }

    const handleclose = () => {
        setedit(null)
    }


    return (
        <div>
            <Helmet>
                <title>Manage Coupons</title>
            </Helmet>
            <div className='flex justify-center items-center sm:p-20 gap-8 flex-wrap'>
                {
                    cupondata.map((item, i) => (
                        <div key={i}>
                            <div className='w-[420px] relative'>
                                <img src="/cuponn.png" alt="" />
                                <h1 className='absolute top-16 left-12 Lato font-extrabold text-6xl text-white'>${item.DiscountAmount}</h1>
                                <h1 className='absolute top-11 right-[54px] Lato font-bold text-[33px] text-[#d98d1a]'>{item.CouponCode}</h1>
                                <p className='absolute top-[85px] right-[50px] Lato font-normal text-[11px] uppercase text-[#d98d1a]'>Exp on: {item.ExpiryDate}</p>
                                <p className='absolute top-[90px] right-[44px] Lato font-normal text-[15px]  uppercase text-[#000000]'>. . . . . . . . . . . . . . . . . . . .</p>
                                <p className='absolute top-[115px] right-[42px] Lato font-normal text-[10px] w-[120px] text-center text-[#d98d1a]'>{item.CouponDescription},</p>
                            </div>
                            <div className='flex gap-5 mt-2'>
                                <button className='w-full bg-[#97d2ffac]' onClick={() => handleedit(item)}>Edit</button>
                                <button className='w-full bg-[#ff9797ac]' onClick={() => handledelete(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div>
                <div className='md:px-20 m-5 sm:ml-14'>
                    <h1 className='text-3xl py-2  text-center'>Add Coupon</h1>

                    <dialog id="my_modal_4" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">

                            <h1 className='text-3xl py-2  text-center'>Edit Coupon</h1>
                            {
                                edit ? <form onSubmit={editsubmt}>
                                    <label className='mb-2'>Coupon Code</label>
                                    <input defaultValue={edit?.CouponCode} required name='CouponCode' type="text" placeholder="Type here" className="input input-bordered w-full my-2 mb-2" />
                                    <label className='mb-2'>Expiry Date</label>
                                    <br />
                                    <div className='border-[1px] border-[#1f1f1f39] rounded-lg'>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="d MMM yyyy"
                                            customInput={<CustomInput />}
                                        />
                                        {/* <div>Selected Date: {formatDate(selectedDate)}</div> */}
                                    </div>
                                    <br />
                                    {/* <input type="text" placeholder="Type here" className="input input-bordered w-full mt-1 mb-2" /> */}

                                    <label className='mb-2'>Coupon code description</label>
                                    <textarea reload defaultValue={edit?.CouponDescription} name='CouponDescription' required className="textarea textarea-bordered w-full my-2" placeholder="Write Your Review heare"></textarea>
                                    <label className='mb-2'>Discount Amount</label>
                                    <input defaultValue={edit?.DiscountAmount} required name='DiscountAmount' type="number" placeholder="Type here" className="input input-bordered w-full mt-1 mb-2" />

                                    <button type='submit' className={formatDate(selectedDate) ? ` w-full my-4 bg-[#29C4FB]` : `w-full my-4 bg-[#5b7883]`}>Submit Coupon</button>
                                </form>
                                    : ''
                            }


                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn" onClick={handleclose}>Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>


                    <form onSubmit={handlecupon} >
                        <label className='mb-2'>Coupon Code</label>
                        <input required name='CouponCode' type="text" placeholder="Type here" className="input input-bordered w-full my-2 mb-2" />
                        <label className='mb-2'>Expiry Date</label>
                        <br />
                        <div className='border-[1px] border-[#1f1f1f39] rounded-lg'>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="d MMM yyyy"
                                customInput={<CustomInput />}
                            />
                            {/* <div>Selected Date: {formatDate(selectedDate)}</div> */}
                        </div>
                        <br />
                        {/* <input type="text" placeholder="Type here" className="input input-bordered w-full mt-1 mb-2" /> */}

                        <label className='mb-2'>Coupon code description</label>
                        <textarea name='CouponDescription' required className="textarea textarea-bordered w-full my-2" placeholder="Write Your Review heare"></textarea>
                        <label className='mb-2'>Discount Amount</label>
                        <input required name='DiscountAmount' type="number" placeholder="Type here" className="input input-bordered w-full mt-1 mb-2" />

                        <button type='submit' className={formatDate(selectedDate) ? ` w-full my-4 bg-[#29C4FB]` : `w-full my-4 bg-[#5b7883]`}>Add Coupon</button>
                    </form>
                </div>
            </div>
        </div >
    );
};

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button type='button' className="custom-input w-[50vw] text-left" onClick={onClick} ref={ref}>
        {value}
    </button>
));


export default ManageCoupons;
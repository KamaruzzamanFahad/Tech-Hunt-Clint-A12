
import React, { useContext, useEffect, useState } from 'react';
import { BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import useAxiousPublic from '../hooks/useAxiousPublic';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiousSecure from '../hooks/useAxiousSecure';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AllProducts = () => {
    const goto = useNavigate()
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiousPublic()
    const axiosSecure = useAxiousSecure()
    const [product, setproduct] = useState([])
    const [reload, setreload] = useState(0)
    const [currentpage, setcurrentpage] = useState(1)
    const [text, settext] = useState([])
    const [count, setcount] = useState(0)
    const productperpage = 6;
    const totalpage = (Math.ceil(parseInt(count) / productperpage))
    const pages = [];

    useEffect(() => {
        axiosPublic.get('/productcount')
            .then(res => {
                setcount(res.data.count)
            })
    }, [])

    for (let i = 0; i < totalpage; i++) {
        pages.push(i)
    }
    useEffect(() => {
        const skip = (currentpage - 1) * productperpage
        axiosPublic.get(`/productsbysize?skip=${skip}&limit=${productperpage}&text=${text}`)
            .then(res => {
                setproduct(res.data)
            })
    }, [reload, currentpage, text])

    const upvotehandle = (id) => {
        const email = user?.email;
        if (user && user?.email) {
            axiosSecure.patch('/upvote', { email, id })
                .then(res => {
                    setreload(Math.random())
                })
        }
        else {
            goto('/login')
        }
    }




    const handlesearch = (e) => {
        settext(e.target.value)

    }



    const handlepagination = async (i) => {
        setcurrentpage(i)
    }
    return (
        <div className='mt-5 mb-10'>
            <Helmet>
                <title>All Products</title>
            </Helmet>
            <h1 className='text-center text-4xl mb-10'>All Products</h1>
            <div data-aos="fade-up"
                data-aos-duration="800" className='flex flex-col justify-center items-center'>
                <form data-aos="fade-up"
                    data-aos-duration="800" className="input input-bordered flex items-center gap-2 w-[90%] md:w-[50%]">
                    <input onChange={handlesearch} name='search' type="text" placeholder="Search" className="input w-full border-none" required />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </form>
            </div>
            <div className=' flex justify-center'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-20 mt-10'>
                    {
                        product.map((item, i) => (
                            <div key={i} className='flex flex-col w-72 rounded-xl bg-[#E2FBFF]'>
                                <img src={item.image} alt="" className='rounded-t-xl  h-60' />
                                <Link>
                                <h1 onClick={() => goto(`/product/${item._id}`)} className='text-left text-2xl w-full p-2 m-0'>{item.name}</h1>
                                </Link>
                                <h4 className='p-2 text-[#0F98FB]'><span className='text-[#034EA2]'>Tages:</span> {item.Tags.map((item) => ` #${item}`)}</h4>

                                <div className='flex justify-end pb-5 pr-5'>
                                    <div disabled={item.OwnerEmail == user?.email && true} onClick={() => upvotehandle(item._id)} className={`btn bg-[#C2F3FD] hover:bg-transparent`}>
                                        {item?.votes?.includes(user?.email) ? <BiSolidUpvote className='text-2xl' /> : <BiUpvote className='text-2xl' />}
                                        <span>{item.votes.length}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-center gap-3 mt-10 mb-10'>
                {
                    pages.map((item, i) => (
                        <button key={i} onClick={() => handlepagination(i + 1)} className={currentpage == i + 1 ? `bg-[#109AFB] text-white` : ` rounded-md border-2 border-[#109AFB] p-2 px-4`}>{i + 1}</button>
                    ))
                }
            </div>
        </div >
    );
};

export default AllProducts;
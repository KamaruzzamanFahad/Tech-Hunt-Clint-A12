import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiousPublic from "../hooks/useAxiousPublic";

const Login = () => {
    const axiosPublic = useAxiousPublic()
    const goto = useNavigate();
    const {
        setlooding,
        LoginByEmail,
        LiginByGoogle,
    } = useContext(AuthContext)

    const loginsucces = () => {
        toast.success("LOGIN SUCCESSFUL");
        goto('/');
    }

    const loginhandle = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        LoginByEmail(email, password)
            .then(() => {
                loginsucces();
            })
            .catch(error => {
                toast(error.message)
            })
    }
    const goglelogin = () => {
        LiginByGoogle()
            .then(res => {
                console.log(res.user.email)
                const userdata = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: 'user',
                }
                axiosPublic.post('/users', userdata)
                    .then(res => {
                        if (res.data.insertedId || res.data == 'useralready') {
                            loginsucces();
                        }
                    })


            })
            .catch(error => toast.error(error.message))
    }

    const [type, settype] = useState('password')


    const [theme, settheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : "light")
    window.addEventListener('click', function (event) {
        if (event.target.classList[0] == "toggle") {
            const theme = localStorage.getItem('theme')
            settheme(theme)
        }
    });
    const cardthemesty = {
        color: (theme == "light") ? 'black' : 'rgb(240, 240, 240)',
        'background-color': (theme == "light") ? 'white' : '#ffffff22',
    };

    const inputstylthem = {
        color: (theme == "light") ? 'black' : 'rgb(240, 240, 240)',
        'background-color': (theme == "light") ? 'white' : '#ffffff22',
    };

    const lable = {
        color: (theme == "light") ? 'black' : 'white',
    };


    return (

        <div className="animate__backInDown">
            <Helmet>
                <title>Login</title>
            </Helmet>

            <div>
                <div className="hero pb-10">
                    <div className="hero-content flex-col lg:flex-row-reverse">

                        <div style={cardthemesty} className="card shrink-0 max-w-sm shadow-2xl p-10 w-80 sm:w-96 ">
                            <h1 className='text-3xl mb-2 font-semibold'>Login your account</h1>
                            <form onSubmit={loginhandle} className="card-body mb-2 p-0">
                                <div className="form-control">
                                    <label className="label">
                                        <span style={lable} className="label-text">Email</span>
                                    </label>
                                    <input style={inputstylthem} name='email' type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span style={lable} className="label-text">Password</span>
                                    </label>

                                    <div style={inputstylthem} className='flex items-center input input-bordered'>
                                        <input name='password' type={type} placeholder="password" className="input w-full border-none outline-none" required />
                                        {
                                            type == "password" ? <FaEyeSlash onClick={() => settype("text")} /> : <FaEye onClick={() => settype("password")} />
                                        }

                                    </div>

                                    <label className="label">
                                        <a style={lable} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-1">
                                    <button className="btn w-fu  bg-[#2BC7FA] text-white outline-none border-none">Login</button>
                                </div>
                            </form>
                            <p className="text-sm text-center">Dont’t Have An Account ? <Link to={'/register'}>Register</Link> </p>

                            <div className="flex justify-center items-center py-5">
                                <hr className="border-[1px] border-[#0000001b] w-full" />
                                <p className="px-3 text-lg">or</p>
                                <hr className="border-[1px] border-[#0000001b] w-full" />
                            </div>

                            <div style={inputstylthem} onClick={goglelogin} className="flex justify-center gap-6 items-center border-[1px] border-solid border-[#00000043] rounded-lg btn">
                                <img width={'10%'} src="gogle.png" alt="" />
                                <p>Login with Google</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Login;
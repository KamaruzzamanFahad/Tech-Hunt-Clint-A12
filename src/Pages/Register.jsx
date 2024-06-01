
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from 'sweetalert2'

const Register = () => {
    const { CreateUserByEmail, UpdateInfo, setuser } = useContext(AuthContext);
    const goto = useNavigate();

    const reginhandle = (e) => {
        e.preventDefault();
        const Name = e.target.Name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if (regex.test(password)) {
            CreateUserByEmail(email, password)
                .then(() => {
                    toast.success("Registration done, prifile updating please wait");
                    console.log('regi done ')

                    UpdateInfo(Name, photoURL)
                        .then(() => {
                            toast.success("LOGIN SUCCESSFUL")
                            setuser({ displayName: Name, photoURL: photoURL })
                            console.log('log done ')
                            goto('/');
                        })
                        .catch((error) => {
                            toast.success(error.massage)
                        })
                })
                .catch(error => {
                    toast.error(error.message)
                    console.log(error)
                })
        } else {
            Swal.fire({
                title: 'Use a Strong Password!',
                text: 'passwords at least 8 characters long and contain a mix of uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and special characters (!@#$%^&*). Avoid using easily guessable information like your name, birthday, or common phrases!',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })

        }

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
        <div>
            <Helmet>
                <title>Register</title>
            </Helmet>

            <div>
                <div className="hero pb-10">
                    <div className="hero-content flex-col lg:flex-row-reverse">

                        <div style={cardthemesty} className="card shrink-0 max-w-sm shadow-2xl  p-10  w-80 sm:w-96">
                            <h1 className='text-3xl mb-2 font-semibold'>Register New account</h1>
                            <form onSubmit={reginhandle} className="card-body mb-2 p-0">
                                <div className="form-control">
                                    <label className="label">
                                        <span style={lable} className="label-text">Name</span>
                                    </label>
                                    <input style={inputstylthem} name='Name' type="text" placeholder="Name" className="input input-bordered" required />
                                </div>
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
                                        <input name='password' type={type} placeholder="password" className="w-full input border-none" required />
                                        {
                                            type == "password" ? <FaEyeSlash onClick={() => settype("text")} /> : <FaEye onClick={() => settype("password")} />
                                        }

                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span style={lable} className="label-text">photoURL</span>
                                    </label>
                                    <input style={inputstylthem} name='photoURL' type="url" placeholder="photoURL" className="input input-bordered" required />
                                </div>
                                <div className="form-control mt-1">
                                    <button className="btn w-fu  bg-[#FF6C1A] text-white outline-none border-none">Register</button>
                                </div>
                            </form>
                            <p className="text-sm text-center">Already have an account? <Link to={'/login'}>Login</Link> </p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};
export default Register;
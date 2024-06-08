import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import useAxiousSecure, { axiosSecure } from "../hooks/useAxiousSecure";


const ModeratorProtected = ({ children }) => {
    const axiosSecure = useAxiousSecure()
    const { user, looding } = useContext(AuthContext);
    const [userdata, setuserdata] = useState([])
    useEffect(() => {
        axiosSecure.get(`/user?email=${user?.email}`)
            .then(res => setuserdata(res.data))
    }, [])

    if (looding || !userdata) {
        return <div className='flex justify-center items-center'><span className="loading loading-infinity loading-lg text-red-500"></span></div>
    }
    else if (userdata.role == 'moderator') {
        return children;
    }

    else {
        return <Navigate to={-1}></Navigate>
    }
};
export default ModeratorProtected;
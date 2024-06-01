import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";


const ProtectedRout = ({ children }) => {
    const { user, looding } = useContext(AuthContext);
    if (looding) {
        return <div className='flex justify-center items-center'><span className="loading loading-infinity loading-lg text-red-500"></span></div>
    }
    else if (user) {
        return children;
    }

    else{
        return <Navigate to={'/login'}></Navigate>
    }
};
export default ProtectedRout;
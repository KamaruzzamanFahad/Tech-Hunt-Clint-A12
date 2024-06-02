import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
export const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiousSecure = () => {
  const { Logout } = useContext(AuthContext);
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("acces-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      if (status == 401 || status == 403) {
        await Logout();
        <Navigate to={'/login'}></Navigate>
        console.log('hiding logout')
      }
      console.log("status code is ", status);
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiousSecure;

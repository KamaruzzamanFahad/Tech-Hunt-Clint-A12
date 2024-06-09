import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://server-tech-hunt.vercel.app",
});

const useAxiousPublic = () => {
  return axiosPublic;
};

export default useAxiousPublic;

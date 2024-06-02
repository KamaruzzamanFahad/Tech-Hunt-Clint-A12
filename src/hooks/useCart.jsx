import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from './useAxiousSecure';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useCart = () => {
    const {user} = useContext(AuthContext)
    console.log(user)
   const {refetch, data: cart=[]} = useQuery({
    queryKey: ['cart'],
    queryFn: async () =>{
        const res = await axiosSecure.get(`/carts?email=${user.email}`) 
        return res.data;
    }
   })
   return [cart, refetch]

};

export default useCart;
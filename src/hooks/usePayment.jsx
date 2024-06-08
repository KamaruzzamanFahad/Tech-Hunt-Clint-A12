
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiousSecure from './useAxiousSecure';

const usePayment = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiousSecure()
    const { refetch, data: payment = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment?email=${user.email}`)
            return res.data;
        }
    })
    return [payment, refetch]

};

export default usePayment;
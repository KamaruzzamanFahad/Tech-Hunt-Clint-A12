import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiousSecure from "./useAxiousSecure";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiousSecure();
  const {
    data: Admina,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["Admina"],
    enabled: !!localStorage.getItem("acces-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log("from admina ", res.data);
      return res.data;
    },
  });
  return [Admina, refetch];
};

export default useAdmin;

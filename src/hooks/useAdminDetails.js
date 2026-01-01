import { useEffect, useState } from "react";
import API_URL from "../api/api";
import { toast } from "react-toastify";

const useAdminDetails = () => {
  const [product, setProduct] = useState();
   const [member, setMember] = useState();
   const [loading, setloading] = useState(false);
   const [openCreateModal, setOpenCreateModal] = useState(false);
 
   const allfetchData = async () => {
     const adminData = await API_URL.get(`/user/alladminData`);
     const data = adminData.data.data;
     console.log(adminData);
     setMember(data);
     const productData = await API_URL.get(`/products/`);
     const result = productData.data;
     console.log("result", result);
     setProduct(result);
   };
   const handleBlock = async (userId, currentStatus) => {
     try {
       console.log(currentStatus);
       if (currentStatus === false) {
         const res = await API_URL.patch(`/user/userBlocked/${userId}`);
 
         toast.success(res.data.message);
 
         setMember((prev) =>
           prev.map((u) =>
             u._id === userId ? { ...u, isBlocked: !currentStatus } : u
           )
         );
       } else {
         const res = await API_URL.patch(`/user/userUnBlocked/${userId}`);
 
         toast.success(res.data.message);
 
         setMember((prev) =>
           prev.map((u) =>
             u._id === userId ? { ...u, isBlocked: !currentStatus } : u
           )
         );
       }
     } catch (error) {
       console.log(error);
       toast.error("Failed to update status");
     }
   };
 
   useEffect(() => {
     allfetchData();
   }, []);
   useEffect(() => {
     setloading(true);
     if (product?.length > 0) {
       setloading(false);
     }
   }, [product]);
  return {
    loading,
    openCreateModal,
    setOpenCreateModal,
    handleBlock,
    product,
    member,
    allfetchData
  };
};

export default useAdminDetails;

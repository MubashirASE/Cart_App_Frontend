import { useEffect, useState } from "react";
import API_URL from "../api/api";

const useAdminHome = () => {
  const [Data, setData] = useState(0);
  const [product, setProduct] = useState(0);
  const [member, setMember] = useState(0);

  const allfetchData = async () => {
    try {
      const userData = await API_URL.get(`/products/`);
      setData(userData.data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const allMembers = async () => {
    try {
      const userData = await API_URL.get(`/user/allUserData`);
      setMember(userData.data.data.length);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };
  const allfetchProduct = async () => {
    try {
      const userData = await API_URL.get(`/products/userProducts`);
      setProduct(userData.data.total);
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };
  useEffect(() => {
    allfetchData();
    allfetchProduct();
    allMembers();
  }, []);
  return {
    Data,
    product,
    member,
  };
};

export default useAdminHome;

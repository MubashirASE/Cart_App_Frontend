import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API_URL from "../api/api.js";
import { toast } from "react-toastify";

const AdminUpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const { state: Data } = useLocation();

  useEffect(() => {
    if (Data) {
      setName(Data.name);
      setPrice(Data.price);
      setQuantity(Data.quantity);
    setPreview(`http://localhost:3001${Data.image}`);
    }
  }, [Data]);

  const display = () => {
    const updateData = { id: Data._id, name, price, quantity, image };
    createdProduct(updateData);
  };

  const createdProduct = async (Data) => {
    try {
      const formData = new FormData();
      formData.append("id", Data.id);
      formData.append("name", Data.name);
      formData.append("price", Data.price);
      formData.append("quantity", Data.quantity);

      if (image) formData.append("image", image);

      const res = await API_URL.patch("/products/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message, {
        style: {
          color: "green",
          fontWeight: "600",
          fontSize: "17px",
          background: "#F7F7F7",
        },
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <h1 className="text-3xl font-extrabold text-blue-600">Update Product</h1>
      <p className="mt-2 text-sm text-gray-600">Modify product details below</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
        
        {/* Left */}
        <div className="space-y-4  bg-gray-100 p-5 rounded-lg ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-white bg-white rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-white bg-white rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-white bg-white rounded-md"
            />
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-70 h-60 object-cover rounded-lg border-none"
            />
          )}
          
         
        </div>

        
      </div>
      <div className="flex justify-center mt-10">
             <button
          onClick={display}
          className=" col-span-1 md:col-span-2 mt-4 w-100 py-2 px-8 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Update Product
        </button>
          </div>
    </div>
  );
};

export default AdminUpdateProduct;

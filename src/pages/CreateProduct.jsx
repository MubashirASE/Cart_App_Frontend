import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api.js";
import { toast } from "react-toastify";

const CreateProd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [serial_number, setSerial_number] = useState("");
  const [image, setImage] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const display = () => {
    const Data = { name, price, quantity, image, serial_number };
    createdProduct(Data);
  };

  const createdProduct = async (Data) => {
    try {
      const formData = new FormData();
      formData.append("name", Data.name);
      formData.append("price", Data.price);
      formData.append("quantity", Data.quantity);
      formData.append("serial_number", Data.serial_number);
      formData.append("image", Data.image);

      setloading(true);

      const res = await API_URL.post("/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res) navigate("/");

      toast.success("Product Created Successfully!");

      setloading(false);
      return res.data;
    } catch (error) {
      setloading(false);
      toast.error(error.response?.data?.message || "Error creating product");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-blue-600">
            Create Product
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Add new product details below
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                placeholder="Product name"
                onChange={(e) => setName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 
                border border-gray-300 placeholder-gray-400 text-gray-900 
                rounded-md focus:outline-none focus:ring-blue-500 
                focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={price}
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 
                border border-gray-300 placeholder-gray-400 text-gray-900 
                rounded-md focus:outline-none focus:ring-blue-500 
                focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                placeholder="Enter quantity"
                onChange={(e) => setQuantity(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 
                border border-gray-300 placeholder-gray-400 text-gray-900 
                rounded-md focus:outline-none focus:ring-blue-500 
                focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Serial Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Serial Number
              </label>
              <input
                type="number"
                value={serial_number}
                placeholder="Enter serial number"
                onChange={(e) => setSerial_number(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 
                border border-gray-300 placeholder-gray-400 text-gray-900 
                rounded-md focus:outline-none focus:ring-blue-500 
                focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={display}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 
            border border-transparent text-sm font-medium rounded-md 
            text-white bg-blue-600 hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-blue-500 transition-colors"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProd;

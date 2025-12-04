import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api.js";
const CreateProd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const display = () => {
    const Data = { name, price, quantity, image };
    console.log(Data);
    createdProduct(Data);
  };

  const createdProduct = async (Data) => {
    try {
      const formData = new FormData();
      formData.append("name", Data.name);
      formData.append("price", Data.price);
      formData.append("quantity", Data.quantity);
      formData.append("image", Data.image);
        console.log(formData)
        const res = await API_URL.post("/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });
      setloading(true);
        if (res) {
        navigate("/"); 
        }
        setloading(false);
      console.log("Product Created:", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  


  return (
    <div className="create-container flex direction-col">
      <h2 style={{
            color: "#306dfd",
            display: "flex",
            justifyContent: "center",
          }}>Create New Product</h2>

      <div className="">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        
      </div>


      <div className="">
        <label>Price :</label>
        <input
          type="number"
          value={price}
          placeholder="$"
          onChange={(e) => setPrice(e.target.value)}
          className="input-field"
        />
       
      </div>
      <div>
         <label>Quantity :</label>
        <input
          type="number"
          value={quantity}
          placeholder="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="image-row">
        <label>Images :</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="image-input "
        />
      </div>

      <button
        onClick={() => {
          display();
        }}
        className="create-button"
        disabled={loading}
      >
        {loading ? <div className="spinner"></div> : "Create Product"}
      </button>
    </div>
  );
};

export default CreateProd;
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../api/api.js";
import { toast } from "react-toastify";
const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState('');
  const data = useLocation();
  const navigate = useNavigate();


  const Data = data.state;
  useEffect(() => {}, [])
  const display = () => {
    console.log(Data);
    const updateData = { id:Data._id,name, price, quantity, image };
    console.log(updateData);
    createdProduct(updateData);
  };
  const createdProduct = async (Data) => {
    try {
      const formData = new FormData();
      formData.append("id",Data.id)
      formData.append("name", Data.name);
      formData.append("price", Data.price);
      formData.append("quantity", Data.quantity);
       
        formData.append("image", image);

      const res = await API_URL.patch("/products/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      toast.success(res.data.message, {
            style: {
              color: "green",
              fontWeight: "600",
              fontSize: "17px",
              background: "#F7F7F7",
            },
          });

      console.log("Product Created:", res.data);
      navigate('/')
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          border: "5px ",
          borderRadius: "5px",
          width: "450px",
          height: "520px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#EFEFEF",
          paddingInline: "25px",
        }}
      >
        <h1
          style={{
            color: "#306dfd",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Update Product:
        </h1>
        <label>Name:</label>
        <input
          type="name"
          value={name}
          placeholder={Data?.name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px",
            marginBlock: "8px",
            border: "0.5px ",
          }}
        />
        
        <label>Price :</label>
        <input
          type="price"
          value={price}
          placeholder={Data?.price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: "8px",
            marginBlock: "8px",
            border: "0.5px ",
          }}
        />
        <label>Quantity :</label>
        <input
          type="quantity"
          value={quantity}
          placeholder={Data?.quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            padding: "8px",
            marginBlock: "8px",
            border: "0.5px ",
          }}
        />
        <label>Images :</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{
            padding: "8px",
            marginBlock: "8px",
            border: "0.5px ",
          }}
        />

        <button
          onClick={display}
          style={{
            padding: "8px",
            border: "1.5px ",
            borderRadius: "5px",
            background: "#306dfd",
            color: "white",
            marginBlock: "8px",
          }}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default UpdateProduct;
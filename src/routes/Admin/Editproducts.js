import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { firestore } from "../../Firebase/firebase";

const Editproducts = () => {
  const history = useHistory();
  const { productsUid } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [amount, setAmount] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productRef = firestore.collection("products").doc(productsUid);
        const productSnapshot = await productRef.get();

        if (productSnapshot.exists) {
          const productData = productSnapshot.data();
          setName(productData.name);
          setDescription(productData.description);
          setQuantity(productData.quantity);
          setAmount(productData.amount);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productsUid]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const productRef = firestore.collection("products").doc(productsUid);
      await productRef.update({
        name,
        description,
        quantity,
        amount,
      });
      console.log("Product data updated successfully!");
      history.push("/listproducts");
    } catch (error) {
      console.error("Error updating product data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-bold mb-2"
          >
            Quantity
          </label>
          <textarea
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Amount
          </label>
          <textarea
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Editproducts;

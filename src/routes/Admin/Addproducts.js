import React, { useState } from "react";
import {
  createProductsDocument,
  uploadproductsImage,
} from "../../Firebase/user";

const Addproducts = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [amount, setAmount] = useState([]);

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    } else {
      console.error("Please select an image");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !description || !image || !quantity || !amount === 0) {
      console.error("Please fill in all fields");
      return;
    }
    let imageURL = "";
    if (image) {
      imageURL = await uploadproductsImage(image);
    }
    const products = {
      name,
      description,
      image: imageURL,
      quantity,
      amount,
    };
    const result = await createProductsDocument(products);

    if (result.success) {
      console.log(result.message);
      // Reset the form fields
      setName("");
      setDescription("");
      setImage("");
      setQuantity([]);
      setAmount([]);
    } else {
      console.error(result.message);
      // Handle error case if needed
    }
  };

  // Res
  return (
    <div className="container mx-auto mt-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
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
            className="block text-gray-700 font-bold mb-2 text-white"
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
            className="block text-gray-700 font-bold mb-2 text-white"
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
            className="block text-gray-700 font-bold mb-2 text-white"
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
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addproducts;

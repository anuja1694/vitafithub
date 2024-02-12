import React, { useState } from "react";
import {
  createProductsDocument,
  uploadproductsImage,
} from "../../Firebase/user";

const Addmemebership = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [plantype, setPlantype] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePlantypeChange = (event) => {
    setPlantype(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description || !plantype || amount === 0) {
      console.error("Please fill in all fields");
      return;
    }

    const products = {
      title,
      description,
      amount,
      plantype,
    };
    const result = await createProductsDocument(products);

    if (result.success) {
      console.log(result.message);
      // Reset the form fields
      setTitle("");
      setDescription("");
      setAmount("");
      setPlantype(" ");
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
            htmlFor="title"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
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
            htmlFor="plantype"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
            Plan Type
          </label>
          <textarea
            id="amount"
            value={plantype}
            onChange={handlePlantypeChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
          ></textarea>
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

export default Addmemebership;

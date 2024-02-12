import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createKidsslotDocument, uploadkidsImage } from "../../Firebase/user";

const Addkidslots = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    } else {
      console.error("Please select an image");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addSlot = () => {
    if (selectedDate) {
      setSlots([...slots, selectedDate]);
      setSelectedDate(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !description || !image || slots.length === 0) {
      console.error("Please fill in all fields");
      return;
    }
    let imageURL = "";
    if (image) {
      imageURL = await uploadkidsImage(image);
    }
    const kidsslots = {
      name,
      description,
      image: imageURL,
      slots,
    };
    const result = await createKidsslotDocument(kidsslots);

    if (result.success) {
      console.log(result.message);
      // Reset the form fields
      setName("");
      setDescription("");
      setImage("");
      setSlots([]);
      setSelectedDate(null);
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
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
            Date and Time
          </label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={handleDateChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select date and time"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="slots"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
            Slots Available
          </label>
          <ul className="border border-gray-300 rounded p-2">
            {slots.map((slot, index) => (
              <li key={index} className="mb-2">
                {slot.toString()}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={addSlot}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-5"
        >
          Add Slot
        </button>
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

export default Addkidslots;

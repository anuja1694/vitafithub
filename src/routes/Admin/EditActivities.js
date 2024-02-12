import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { firestore } from "../../Firebase/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditActivities = () => {
  const { activityUid } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [slots, setSlots] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const activityDoc = await firestore
          .collection("activities")
          .doc(activityUid)
          .get();
        if (activityDoc.exists) {
          const data = activityDoc.data();
          setName(data.name);
          setDescription(data.description);
          setImage(data.image);
          setSlots(
            data.slots.map((timestamp) => new Date(timestamp).toISOString())
          );
        } else {
          console.error("Activity not found.");
        }
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    fetchActivityData();
  }, [activityUid]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleDateChange = (date, index) => {
    const updatedSlots = [...slots];
    updatedSlots[index] = date.toISOString(); // Convert Date object to ISO format
    setSlots(updatedSlots);
  };

  const addSlot = () => {
    setSlots([...slots, null]);
  };

  const removeSlot = (index) => {
    const updatedSlots = [...slots];
    updatedSlots.splice(index, 1);
    setSlots(updatedSlots);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!name || !description || slots.some((slot) => !slot)) {
      console.error("Please fill in all fields.");
      return;
    }

    try {
      // Update the activity data in Firestore
      await firestore.collection("activities").doc(activityUid).update({
        name,
        description,
        image,
        slots,
      });

      console.log("Activity data updated successfully.");
      history.push("/listactivities");
    } catch (error) {
      console.error("Error updating activity data:", error);
    }
  };

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
            required
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
            required
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
            htmlFor="slots"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
            Slots
          </label>
          {slots.map((slot, index) => (
            <div key={index} className="mb-2">
              <DatePicker
                selected={new Date(slot)}
                onChange={(date) => handleDateChange(date, index)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select date and time"
              />
              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Remove Slot
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSlot}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Slot
          </button>
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

export default EditActivities;

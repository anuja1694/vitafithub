import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { firestore } from "../../Firebase/firebase";

const EditTrainer = () => {
  const { trainerUid } = useParams();
  const [name, setName] = useState("");
  const [certified, setCertified] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const trainerDoc = await firestore
          .collection("trainers")
          .doc(trainerUid)
          .get();
        if (trainerDoc.exists) {
          const data = trainerDoc.data();
          setName(data.name);
          setCertified(data.certification);
          setEmail(data.email);
          setPhone(data.phone);
        } else {
          console.error("Trainer not found.");
        }
      } catch (error) {
        console.error("Error fetching trainer data:", error);
      }
    };

    fetchTrainerData();
  }, [trainerUid]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCertifiedChange = (event) => {
    setCertified(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const validatePhone = () => {
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone)) {
      setPhoneError("Please enter a valid phone number.");
    } else {
      setPhoneError("");
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!name || !certified || !email || !phone) {
      console.error("Please fill in all fields.");
      return;
    }
    validateEmail();
    if (emailError) {
      console.error(emailError);
      return;
    }
    validatePhone();
    if (phoneError) {
      console.error(phoneError);
      return;
    }

    try {
      // Update the trainer data in Firestore
      await firestore.collection("trainers").doc(trainerUid).update({
        name,
        certification: certified,
        email,
        phone,
      });

      console.log("Trainer data updated successfully.");
      history.push("/listtrainers");
    } catch (error) {
      console.error("Error updating trainer data:", error);
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
            htmlFor="certified"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
            Certified in
          </label>
          <textarea
            id="certified"
            value={certified}
            required
            onChange={handleCertifiedChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onBlur={validateEmail}
            onChange={handleEmailChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-bold mb-2 text-white"
          >
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            required
            onBlur={validatePhone}
            onChange={handlePhoneChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
          />
          {phoneError && <p className="text-red-500">{phoneError}</p>}
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

export default EditTrainer;

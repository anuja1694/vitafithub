import React, { useEffect, useState } from "react";
import { firestore } from "../../Firebase/firebase";
import Chat from "../../routes/User/Chat";
// import axios from "axios";
// import { Configuration, OpenAIApi } from "openai";
// import readline from "readline";

const Card = ({ image, name, certification, email, phone }) => {
  const [chatVisible, setChatVisible] = useState(false);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleChatToggle = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center">
        <div className="w-1/3">
          <img src={image} alt={name} className="object-cover h-full w-full" />
        </div>
        <div className="w-2/3 p-4 ">
          <h3 className="text-xl font-bold mb-2 text-black ">{name}</h3>
          <p className="text-gray-600 mb-4">{certification}</p>
          <div className="flex items-center justify-between">
            <button
              onClick={handleEmailClick}
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Email
            </button>
            <button
              onClick={handleChatToggle}
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Chat
            </button>
            <button
              onClick={handlePhoneClick}
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.712 2.294a1 1 0 01.13 1.407l-2.08 2.465a12.06 12.06 0 003.266 3.265l2.466-2.08a1 1 0 011.407.13l2.122 2.12A9.978 9.978 0 0120 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0a9.978 9.978 0 013.265.55l2.122-2.121zm-4.258 5.585l-1.72 1.721a1 1 0 01-1.487-.078l-.652-.782a9.048 9.048 0 00-2.94 2.94l.782.652a1 1 0 01.078 1.487l-1.72 1.721a7.064 7.064 0 001.1 1.1l1.72-1.721a1 1 0 011.487.078l.652.782a9.048 9.048 0 002.94-2.94l-.782-.652a1 1 0 01-.078-1.487l1.721-1.72a7.064 7.064 0 00-1.1-1.1z"
                  clipRule="evenodd"
                />
              </svg>
              Call
            </button>
          </div>
          {chatVisible && <Chat />}
        </div>
      </div>
    </div>
  );
};

const CardList = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainersCollection = firestore.collection("trainers");
        const snapshot = await trainersCollection.get();

        const trainersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCardData(trainersData);
      } catch (error) {
        console.log("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-32">
      {cardData.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};
export default CardList;

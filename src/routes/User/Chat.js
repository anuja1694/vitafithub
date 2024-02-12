import React, { useState } from "react";

const Chat = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChatToggle = () => {
    setChatVisible(!chatVisible);
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, { sender: "user", text: newMessage }]);
    setNewMessage("");

    const userMessage = newMessage.toLowerCase();
    const trainingKeywords = [
      "exercise",
      "workout",
      "routine",
      "training",
      "fitness",
      "gym",
    ];

    let trainerResponse = "Thank you for your message!";

    for (const keyword of trainingKeywords) {
      if (userMessage.includes(keyword)) {
        trainerResponse =
          "Sure, I can help you with your training! What do you need assistance with?";
        break;
      }
    }

    setTimeout(() => {
      setMessages([...messages, { sender: "trainer", text: trainerResponse }]);
    }, 500);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleChatToggle}
        className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      {chatVisible && (
        <div className="fixed bottom-20 right-4 bg-white w-60 p-4 shadow-lg rounded-lg mr-40">
          <div className="h-40 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user" ? "text-right mb-2" : "mb-2"
                }
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-black"
                      : "bg-gray-200 text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center text-black">
            <input
              type="text"
              value={newMessage}
              onChange={handleNewMessageChange}
              className="flex-grow border rounded-md px-2 py-1 focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
            <button
              onClick={handleCloseChat}
              className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

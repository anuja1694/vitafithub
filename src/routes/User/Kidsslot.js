import React, { useState, useEffect } from "react";
import Navbar from "../../components/Home/Navrbar";
import { firestore } from "../../Firebase/firebase";
import { bookKidsslots } from "../../Firebase/user";
import { useAuth } from "../../Firebase/AuthContext";

const Kidsslot = () => {
  const [kidsactivities, setKidsactivities] = useState([]);

  useEffect(() => {
    const kidsactivitiesRef = firestore.collection("kidsslots");
    const unsubscribeActivities = kidsactivitiesRef.onSnapshot(
      (querySnapshot) => {
        const kidsactivitiesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const slots = data.slots.map((slot) => {
            const date = slot.toDate();
            return date.toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
          });
          const createdAt =
            typeof data.createdAt === "object"
              ? data.createdAt.toDate().toLocaleString()
              : data.createdAt;
          return {
            uid: doc.id,
            ...data,
            createdAt: createdAt,
            slots: slots,
          };
        });
        setKidsactivities(kidsactivitiesData);
      }
    );

    return unsubscribeActivities;
  }, []);

  const { currentUser } = useAuth();

  const handleBookKidsslots = async (name, bookingkidsUid, bookedSlot) => {
    try {
      if (!currentUser) {
        console.error("Error: User is not logged in.");
        return;
      }

      await bookKidsslots(name, bookingkidsUid, bookedSlot, currentUser.uid);
      window.location.href = "/bookedkidsslot";
    } catch (error) {
      console.error("Error booking kid's slots:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto sm:px-4 md:px-6 lg:px-8">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 py-32">
          {kidsactivities.map((kidsslots) => (
            <div
              key={kidsslots.uid}
              className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg h-40 w-full object-cover"
                  src={kidsslots.image}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {kidsslots.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {kidsslots.description}
                </p>
                <div className="mb-4">
                  <label
                    htmlFor="slots"
                    className="block text-gray-700 font-bold mb-2 text-white"
                  >
                    Available Slots
                  </label>
                  <select
                    id="slots"
                    className="w-full border border-gray-300 px-3 py-2 rounded text-black"
                    onChange={(e) =>
                      handleBookKidsslots(
                        kidsslots.uid,
                        e.target.value,
                        kidsslots.name
                      )
                    }
                  >
                    <option value="">Select a slot</option>
                    {kidsslots.slots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() =>
                    handleBookKidsslots(
                      kidsslots.uid,
                      document.getElementById("slots").value,
                      kidsslots.name
                    )
                  }
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kidsslot;

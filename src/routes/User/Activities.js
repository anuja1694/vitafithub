import React, { useState, useEffect } from "react";
import Navbar from "../../components/Home/Navrbar";
import { firestore } from "../../Firebase/firebase";
import { bookActivity } from "../../Firebase/user";
import { useAuth } from "../../Firebase/AuthContext";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const activitiesRef = firestore.collection("activities");
    const unsubscribeActivities = activitiesRef.onSnapshot((querySnapshot) => {
      const activitiesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const slots = data.slots.map((slot) => {
          // Check if "slot" is a Firestore Timestamp or a date string
          const date = slot.toDate ? slot.toDate() : new Date(slot);
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
      setActivities(activitiesData);
    });

    return () => unsubscribeActivities();
  }, []);

  const { currentUser } = useAuth();

  const handleBookActivity = async (activityUid, selectedSlot) => {
    if (!currentUser) {
      console.error("Error: User is not logged in.");
      return;
    }
    try {
      await bookActivity(currentUser.uid, activityUid, selectedSlot);
      window.location.href = "/bookedactivities";
    } catch (error) {
      console.error("Error booking activity:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto sm:px-4 md:px-6 lg:px-8">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 py-32">
          {activities.map((activity) => (
            <div
              key={activity.uid}
              className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg h-40 w-full object-cover"
                  src={activity.image}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {activity.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {activity.description}
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
                      handleBookActivity(activity.uid, e.target.value)
                    }
                  >
                    <option value="">Select a slot</option>
                    {activity.slots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => {
                    if (!activity.name) {
                      console.error(
                        "Error: activityName is undefined for the activity:",
                        activity
                      );
                      return;
                    }
                    // handleBookActivity(activity.uid, activity.name);
                  }}
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

export default Activities;

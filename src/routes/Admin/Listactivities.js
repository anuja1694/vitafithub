import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";

function ListActivities() {
  const history = useHistory();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const activitiesRef = firestore.collection("activities");
    const unsubscribeActivities = activitiesRef.onSnapshot((querySnapshot) => {
      const activitiesData = querySnapshot.docs.map((doc) => {
        // Process each document in the "activities" collection
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

    // Clean up the subscription to prevent memory leaks
    return () => unsubscribeActivities();
  }, []);

  const deleteUser = (uid) => {
    const activitiesRef = firestore.collection("activities").doc(uid);
    activitiesRef
      .delete()
      .then(() => {
        console.log("Activity deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting activity: ", error);
      });
  };
  const handleEdit = (activityUid) => {
    history.push(`/editactivity/${activityUid}`);
  };

  const goBack = () => {
    history.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <button
        onClick={goBack}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Go Back
      </button>
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border">ActivityUid</th>
                <th className="border">Created At</th>
                <th className="border">Name</th>
                <th className="border">Description</th>
                <th className="border">Image</th>
                <th className="border">Slots list</th>
                <th className="border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.uid}>
                  <td className="border" style={{ width: "200px" }}>
                    {activity.uid}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {activity.createdAt}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {activity.name}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {activity.description}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {/* If "image" is a URL, you may want to display it as an image */}
                    <img src={activity.image} alt={activity.name} />
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {activity.slots && activity.slots.join(", ")}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    <div className="flex justify-center">
                      <button
                        onClick={() => deleteUser(activity.uid)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          width: "80px",
                        }}
                        className="px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(activity.uid)}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          width: "80px",
                        }}
                        className="px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListActivities;

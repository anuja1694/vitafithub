import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Firebase/AuthContext";
import firebase from "firebase/app";

function Bookedactivitiesadmin() {
  const [bookedActivities, setBookedActivities] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showRescheduleOptions, setShowRescheduleOptions] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const history = useHistory();
  const { currentUser } = useAuth();

  const fetchBookedActivities = async () => {
    try {
      // Fetch all bookings data
      const bookingRef = firestore.collection("bookings");
      const snapshot = await bookingRef.get();

      const bookedActivitiesData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const bookingData = doc.data();

          // Fetch activity information
          const activityRef = firestore
            .collection("activities")
            .doc(bookingData.activityId);
          const activityDoc = await activityRef.get();
          const activityName = activityDoc.exists
            ? activityDoc.data().name
            : "Unknown Activity";

          // Fetch user information
          const userRef = firestore.collection("users").doc(bookingData.userId);
          const userDoc = await userRef.get();
          const userEmail = userDoc.exists
            ? userDoc.data().email
            : "Unknown User";

          const activitySlots = activityDoc.exists
            ? activityDoc.data().slots
            : [];

          const bookedSlotDate = bookingData.bookedSlot.toDate();

          const remainingSlots = activitySlots.filter(
            (slot) => slot instanceof firebase.firestore.Timestamp
          );

          return {
            ...bookingData,
            activityName,
            userEmail,
            activitySlots,
            remainingSlots,
            bookingId: doc.id, // Adding bookingId to the returned data
          };
        })
      );

      // Filter out any null values in case the activity or user doesn't exist
      const filteredBookedActivities = bookedActivitiesData.filter(Boolean);
      setBookedActivities(filteredBookedActivities);
    } catch (error) {
      console.error("Error fetching booked activities:", error);
    }
  };

  useEffect(() => {
    // Fetch booked activities when the currentUser changes
    fetchBookedActivities();
  }, []);

  const deleteActivity = async (selectedActivity) => {
    try {
      // Step 1: Delete the activity from Firestore
      await firestore
        .collection("bookings")
        .doc(selectedActivity.bookingId)
        .delete();

      // Step 2: Update the state to remove the deleted activity from the page
      setBookedActivities((prevActivities) =>
        prevActivities.filter(
          (activity) => activity.bookingId !== selectedActivity.bookingId
        )
      );

      // Step 3: Fetch the updated list of activities
      fetchBookedActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleReschedule = (activity) => {
    setSelectedBookingId(activity.bookingId);
    setShowRescheduleOptions(true);
  };

  const handleConfirmReschedule = async () => {
    if (!selectedSlot || !selectedBookingId) {
      console.error("Error: Please select a slot.");
      return;
    }

    try {
      // Check if the selectedActivityId is valid and get the selectedActivity
      const selectedActivity = bookedActivities.find(
        (activity) => activity.bookingId === selectedBookingId
      );

      if (!selectedActivity) {
        console.error("Error: Selected activity not found.");
        return;
      }

      // Check if the selected slot is in the remainingSlots array
      const selectedSlotObject = selectedActivity.remainingSlots.find(
        (slot) => slot.toMillis().toString() === selectedSlot
      );

      if (!selectedSlotObject) {
        console.error("Error: Invalid slot selection.");
        return;
      }

      // Perform the rescheduling by updating the Firestore document
      const activityRef = firestore
        .collection("bookings")
        .doc(selectedBookingId);
      await activityRef.update({
        bookedSlot: selectedSlotObject.toDate(),
      });

      // Fetch the updated list of activities
      fetchBookedActivities();

      // After successful rescheduling, reset the state
      setShowRescheduleOptions(false);
      setSelectedBookingId(null);
      setSelectedSlot("");
    } catch (error) {
      console.error("Error confirming reschedule:", error);
    }
  };

  const handleCancelReschedule = () => {
    setShowRescheduleOptions(false);
    setSelectedBookingId(null);
    setSelectedSlot("");
  };
  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-center text-sm font-light">
              <thead class="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" class=" px-6 py-4">
                    #
                  </th>
                  <th scope="col" class=" px-6 py-4">
                    User Email
                  </th>
                  <th scope="col" class=" px-6 py-4">
                    Activity name
                  </th>
                  <th scope="col" class=" px-6 py-4">
                    Booked slot
                  </th>
                  <th scope="col" class=" px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookedActivities.map((activity, index) => (
                  <tr class="border-b dark:border-neutral-500" key={index}>
                    <td class="whitespace-nowrap  px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {activity.userEmail} {/* Render the userEmail here */}
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {activity.activityName}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {activity.bookedSlot instanceof Date
                        ? activity.bookedSlot.toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : activity.bookedSlot.toDate().toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => deleteActivity(activity)}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            width: "80px",
                          }}
                          className="px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                        {showRescheduleOptions &&
                        selectedBookingId === activity.bookingId ? (
                          <>
                            {activity.remainingSlots &&
                            activity.remainingSlots.length > 0 ? (
                              <select
                                id="slots"
                                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
                                value={selectedSlot}
                                onChange={(e) =>
                                  setSelectedSlot(e.target.value)
                                }
                              >
                                <option value="">Select a slot</option>
                                {activity.remainingSlots.map((slot, index) => (
                                  <option key={index} value={slot.toMillis()}>
                                    {new Date(slot.toDate()).toLocaleString()}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <p>No slots available</p>
                            )}
                            <button
                              onClick={handleConfirmReschedule}
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                width: "100px",
                              }}
                              className="px-4 py-2 rounded"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={handleCancelReschedule}
                              style={{
                                backgroundColor: "gray",
                                color: "white",
                                width: "100px",
                              }}
                              className="px-4 py-2 rounded"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleReschedule(activity)}
                            style={{
                              backgroundColor: "blue",
                              color: "white",
                              width: "100px",
                            }}
                            className="px-4 py-2 rounded"
                          >
                            Reschedule
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookedactivitiesadmin;

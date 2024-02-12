import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useAuth } from "../../Firebase/AuthContext";
import firebase from "firebase/app";

function Bookedkidslotadmin() {
  const [bookingsData, setBookingsData] = useState([]);
  const { currentUser } = useAuth();
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showRescheduleOptions, setShowRescheduleOptions] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  async function fetchBookings() {
    try {
      const bookingRef = firestore.collection("kidsslotbookings");
      const snapshot = await bookingRef.get();

      const bookingsData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const bookingData = doc.data();

          // Attempt to fetch the user document
          const userRef = firestore.collection("users").doc(bookingData.userId);
          const userDoc = await userRef.get();
          const userEmail = userDoc.exists
            ? userDoc.data().email
            : "Unknown User";

          const activityRef = firestore
            .collection("kidsslots")
            .doc(bookingData.bookingkidsUid);

          const activityDoc = await activityRef.get();
          const activityName = activityDoc.exists
            ? activityDoc.data().name
            : "Unknown Activity";

          const activitySlots = activityDoc.exists
            ? activityDoc.data().slots
            : [];

          const remainingSlots = activitySlots.filter(
            (slot) => slot instanceof firebase.firestore.Timestamp
          );

          return {
            ...bookingData,
            activityName,
            activitySlots,
            remainingSlots,
            userEmail,
            bookingId: doc.id, // Include the userEmail in the booking data
          };
        })
      );

      const filteredBookedActivities = bookingsData.filter(Boolean);
      setBookingsData(filteredBookedActivities);
    } catch (error) {
      console.error("Error fetching booked activities:", error);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (selectedActivity) => {
    try {
      // Delete the booking from Firestore using the provided ID
      await firestore
        .collection("kidsslotbookings")
        .doc(selectedActivity)
        .delete();
      // After successful deletion, update the state to reflect the changes
      setBookingsData((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== selectedActivity)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
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
      const selectedActivity = bookingsData.find(
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
      fetchBookings();

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
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    User Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Activity name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Booked slot
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.map((activity, index) => (
                  <tr
                    key={activity.bookingId}
                    className="border-b dark:border-neutral-500"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {activity.userEmail}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {activity.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {activity.bookedSlot}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            handleDeleteBooking(activity.bookingkidsUid)
                          }
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

export default Bookedkidslotadmin;

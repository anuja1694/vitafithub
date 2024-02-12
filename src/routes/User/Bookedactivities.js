import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useAuth } from "../../Firebase/AuthContext";
import firebase from "firebase/app";

function Bookedactivities() {
  const [bookedActivities, setBookedActivities] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showRescheduleOptions, setShowRescheduleOptions] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const { currentUser } = useAuth();

  const fetchBookedActivities = async () => {
    if (!currentUser) {
      console.error("Error: User is not logged in.");
      return;
    }

    const userId = currentUser.uid;
    const bookingRef = firestore.collection("bookings");
    const snapshot = await bookingRef.where("userId", "==", userId).get();

    const bookedActivitiesData = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const bookingData = doc.data();
        const activityRef = firestore
          .collection("activities")
          .doc(bookingData.activityId);
        const activityDoc = await activityRef.get();

        if (activityDoc.exists) {
          const activityName = activityDoc.data().name;

          console.log("activityName", activityName);
          // console.log('bookingData.bookedSlot.toMillis()', bookingData.bookedSlot.toMillis());
          const activitySlots = activityDoc.data().slots;

          const remainingSlots = activitySlots.filter((slot) => {
            if (slot instanceof firebase.firestore.Timestamp) {
              console.log(
                "slot.toMillis().toString()",
                slot.toMillis().toString()
              );
              console.log(
                "bookingData.bookedSlot.toMillis().toString()",
                bookingData.bookedSlot.toMillis().toString()
              );
              return (
                bookingData.bookedSlot.toMillis().toString() !==
                slot.toMillis().toString()
              );
            } else {
              console.error(
                "Error: Invalid timestamp data in activitySlots array."
              );
              return false;
            }
          });
          console.log("remainingSlots", remainingSlots);

          return {
            ...bookingData,
            activityName,
            activitySlots,
            remainingSlots,
            bookingId: doc.id,
          };
        } else {
          return null;
        }
      })
    );

    // Filter out any null values in case the activity doesn't exist
    const filteredBookedActivities = bookedActivitiesData.filter(Boolean);
    setBookedActivities(filteredBookedActivities);
  };

  useEffect(() => {
    // Fetch booked activities when the currentUser changes
    fetchBookedActivities();
  }, [currentUser]);

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

  const handleReschedule = async (activityId) => {
    try {
      setSelectedBookingId(activityId);
      setShowRescheduleOptions(true);
    } catch (error) {
      console.error("Error rescheduling activity:", error);
    }
  };

  async function handleConfirmReschedule() {
    if (!selectedSlot || !selectedBookingId) {
      console.error("Error: Please select a slot.");
      return;
    }

    // Check if the selectedActivityId is valid and get the selectedActivity
    const selectedActivity = bookedActivities.find(
      (activity) => activity.bookingId === selectedBookingId
    );

    if (!selectedActivity) {
      console.error("Error: Selected activity not found.");
      return;
    }

    // Check if the selected slot is in the remainingSlots array
    const selectedSlotObject = selectedActivity.remainingSlots.filter(
      (slot) => slot.toMillis().toString() === selectedSlot
    );

    if (!selectedSlotObject[0]) {
      console.error("Error: Invalid slot selection.");
      return;
    }

    // Perform the rescheduling by updating the Firestore document
    const activityRef = firestore.collection("bookings").doc(selectedBookingId);
    await activityRef.update({
      bookedSlot: selectedSlotObject[0].toDate(),
    });

    // Fetch the updated list of activities
    fetchBookedActivities();

    // After successful rescheduling, reset the state
    setShowRescheduleOptions(false);
    setSelectedBookingId(null);
    setSelectedSlot("");
  }

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
                    <td class="whitespace-nowrap  px-6 py-4">
                      {activity.activityName}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {activity.bookedSlot.toDate().toLocaleString("en-US", {
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
                                    {slot.toDate().toLocaleString()}
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
                            onClick={() => handleReschedule(activity.bookingId)}
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

export default Bookedactivities;

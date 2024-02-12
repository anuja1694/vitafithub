import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useAuth } from "../../Firebase/AuthContext";

function Bookedkidsslot() {
  const [bookingsData, setBookingsData] = useState([]);
  const { currentUser } = useAuth();
  const [showRescheduleOptions, setShowRescheduleOptions] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [activityRemainingSlots, setActivityRemainingSlots] = useState([]);

  const fetchBookings = async () => {
    if (!currentUser) {
      console.error("Error: User is not logged in.");
      return;
    }
    try {
      const userId = currentUser.uid;
      const bookingRef = firestore.collection("kidsslotbookings");
      const snapshot = await bookingRef.orderBy("createdAt", "desc").get();

      const bookingsData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const bookingData = doc.data();
          const remainingSlots = bookingData.remainingSlots || [];
          return {
            id: doc.id,
            ...bookingData,
            remainingSlots,
          };
        })
      );

      setBookingsData(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentUser]);

  const handleDeleteBooking = async (id) => {
    try {
      // Delete the booking from Firestore using the provided ID
      await firestore.collection("kidsslotbookings").doc(id).delete();
      // After successful deletion, update the state to reflect the changes
      setBookingsData((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== id)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleReschedule = async (bookingId) => {
    try {
      setSelectedBookingId(bookingId);
      setShowRescheduleOptions(true);

      // Find the booking with the selected bookingId
      const selectedBooking = bookingsData.find(
        (booking) => booking.id === bookingId
      );

      if (selectedBooking) {
        // Fetch the activity data from Firestore using bookingkidsUid
        const activityRef = firestore
          .collection("kidsslots")
          .doc(selectedBooking.bookingkidsUid);
        const activityDoc = await activityRef.get();

        if (activityDoc.exists) {
          const activityData = activityDoc.data();
          // Calculate remaining slots for the activity
          const remainingSlots = activityData.slots.filter(
            (slot) =>
              !selectedBooking.remainingSlots.some(
                (bookingSlot) =>
                  bookingSlot.toMillis().toString() ===
                  slot.toMillis().toString()
              )
          );
          setActivityRemainingSlots(remainingSlots);
        }
      }
    } catch (error) {
      console.error("Error rescheduling booking:", error);
    }
  };

  const handleConfirmReschedule = async () => {
    try {
      if (!selectedSlot || !selectedBookingId) {
        console.error("Error: Please select a slot.");
        return;
      }

      // Check if the selected booking is valid and get the booking
      const selectedBooking = bookingsData.find(
        (booking) => booking.id === selectedBookingId
      );

      if (!selectedBooking) {
        console.error("Error: Selected booking not found.");
        return;
      }

      // Check if the selected slot is in the remainingSlots array
      const selectedSlotObject = selectedBooking.remainingSlots.filter(
        (slot) => slot.toMillis().toString() === selectedSlot
      );

      if (!selectedSlotObject[0]) {
        console.error("Error: Invalid slot selection.");
        return;
      }

      // Perform the rescheduling by updating the Firestore document
      const bookingRef = firestore
        .collection("kidsslotbookings")
        .doc(selectedBookingId);
      await bookingRef.update({
        bookedSlot: selectedSlotObject[0].toDate(),
      });

      // Fetch the updated list of bookings
      fetchBookings();

      // After successful rescheduling, reset the state
      setShowRescheduleOptions(false);
      setSelectedBookingId(null);
      setSelectedSlot("");
    } catch (error) {
      console.error("Error rescheduling booking:", error);
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
                  {/* <th scope="col" className="px-6 py-4">
                    User Email
                  </th> */}
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
                {bookingsData.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className="border-b dark:border-neutral-500"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    {/* ... (existing code) */}
                    <td className="whitespace-nowrap px-6 py-4">
                      {booking.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {booking.bookedSlot}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
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
                        selectedBookingId === booking.id ? (
                          <>
                            {activityRemainingSlots.length > 0 ? (
                              <select
                                id="slots"
                                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
                                value={selectedSlot}
                                onChange={(e) =>
                                  setSelectedSlot(e.target.value)
                                } // Update the selectedSlot state with the selected value
                              >
                                <option value="">Select a slot</option>
                                {activityRemainingSlots.map((slot, index) => (
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
                            onClick={() => handleReschedule(booking.id)}
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

export default Bookedkidsslot;

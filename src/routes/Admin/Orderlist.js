import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";

function Orderlist() {
  const history = useHistory();

  const [orderData, setOrderData] = useState([]);

  async function fetchUserEmail(userId) {
    try {
      const userRef = firestore.collection("users").doc(userId);
      const userDoc = await userRef.get();
      return userDoc.exists ? userDoc.data().email : "Unknown User";
    } catch (error) {
      console.error("Error fetching user email:", error);
      return "Unknown User";
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = firestore.collection("orders");
        const querySnapshot = await ordersCollection.get();

        // Map each order document to the required data fields
        const ordersData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const { createdAt, productId, name, quantity, amount, userId } =
              doc.data();

            // Fetch the user's email based on the userId
            const userEmail = await fetchUserEmail(userId);

            return {
              createdAt: createdAt.toDate().toLocaleDateString(),
              productId,
              name,
              quantity,
              amount,
              userEmail, // Include the userEmail property
            };
          })
        );

        setOrderData(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
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
                <th className="border">Productid</th>
                <th className="border">Created At</th>
                <th className="border">User Email</th>
                <th className="border">Product Name</th>
                <th className="border">amount</th>
                <th className="border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) => (
                <tr key={order.productId}>
                  <td className="border" style={{ width: "200px" }}>
                    {order.productId}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {order.createdAt}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {order.userEmail}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {order.name}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {order.quantity * order.amount}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {order.quantity}
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

export default Orderlist;

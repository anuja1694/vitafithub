import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useAuth } from "../../Firebase/AuthContext";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!currentUser) {
          console.error("Error: User is not logged in.");
          return;
        }
        const userId = currentUser.uid;
        const ordersCollection = firestore.collection("orders");
        const querySnapshot = await ordersCollection
          .where("userId", "==", userId)
          .orderBy("createdAt", "desc") // Order by date (most recent first)
          .get();

        const ordersData = querySnapshot.docs.map((doc) => {
          const { createdAt, productId, name, quantity, amount } = doc.data();
          return {
            createdAt: createdAt.toDate().toLocaleDateString(),
            productId,
            name,
            quantity,
            amount,
          };
        });
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentUser]);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {order.createdAt}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {order.productId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {order.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {order.quantity}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {order.quantity * order.amount}
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

export default Orders;

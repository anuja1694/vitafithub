import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";

const MembershipDetailsTable = ({ membershipDetails }) => {
  const history = useHistory();

  const goBack = () => {
    history.push("/dashboard");
  };
  return (
    <div class="flex flex-col">
      <button
        onClick={goBack}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Go Back
      </button>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-center text-sm font-light">
              <thead class="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" class=" px-6 py-4">
                    Email
                  </th>
                  <th scope="col" class=" px-6 py-4">
                    Membership Type
                  </th>
                  <th scope="col" class=" px-6 py-4">
                    Description
                  </th>
                  <th scope="col" class=" px-6 py-4">
                    Amount
                  </th>
                  <th scope="col" class=" px-6 py-4">
                    Created Date
                  </th>
                  <th scope="col" class=" px-6 py-4">
                    Expiry Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {membershipDetails.map((detail) => (
                  <tr class="border-b dark:border-neutral-500" key={detail.id}>
                    <td class="whitespace-nowrap  px-6 py-4">{detail.email}</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {detail.membershipType}
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4">{detail.name}</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {detail.amount} GBP
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {detail.createdDate.toLocaleString()}
                    </td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {detail.expiryDate.toLocaleString()}
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
};

const Bookedmembership = () => {
  const [membershipDetails, setMembershipDetails] = useState([]);
  useEffect(() => {
    const fetchMembershipDetails = async () => {
      try {
        const snapshot = await firestore.collection("memberships").get();
        const details = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email,
            membershipType: data.type,
            description: data.description,
            name: data.name,
            amount: parseFloat(data.amount),
            createdDate: data.createdAt.toDate(),
            expiryDate: calculateExpiryDate(data.createdAt.toDate(), data.type),
          };
        });
        setMembershipDetails(details);
      } catch (error) {
        console.error("Error fetching membership details:", error.message);
      }
    };

    fetchMembershipDetails();
  }, []);

  // Helper function to calculate the expiry date based on the membership type
  const calculateExpiryDate = (createdDate, membershipType) => {
    if (membershipType === "Daily Pass") {
      return new Date(createdDate.getTime() + 24 * 60 * 60 * 1000); // One day expiry
    } else if (membershipType === "Monthly Pass") {
      const expiryDate = new Date(createdDate);
      expiryDate.setMonth(expiryDate.getMonth() + 1); // One month expiry
      return expiryDate;
    } else {
      return null; // Return null for other membership types (customize as needed)
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Membership Details</h1>
      <MembershipDetailsTable membershipDetails={membershipDetails} />
    </div>
  );
};

export default Bookedmembership;

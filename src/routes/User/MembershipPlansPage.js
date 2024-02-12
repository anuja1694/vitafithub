import React, { useState, useEffect } from "react";
import { useAuth } from "../../Firebase/AuthContext";
import { getMembershipPlans } from "../../Firebase/user";
// Create this function to fetch membership plans
import QRCode from "qrcode.react";

const MembershipPlansPage = () => {
  const { currentUser } = useAuth();
  const [membershipPlans, setMembershipPlans] = useState([]);

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        if (currentUser) {
          const plans = await getMembershipPlans(currentUser.uid);
          setMembershipPlans(plans);
        }
      } catch (error) {
        console.error("Error fetching membership plans:", error.message);
      }
    };

    fetchMembershipPlans();
  }, [currentUser]);

  const formatDate = (date) => {
    return date.toLocaleString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Membership Plans</h1>
      <div className="grid grid-cols-1 gap-4">
        {membershipPlans.map((plan) => (
          <div key={plan.id} className="p-8 border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">{plan.membershipType}</h2>
            <p className="text-gray-600">{plan.description}</p>
            <p className="text-2xl font-bold mt-2">{plan.name}</p>
            <p className="mt-2">Amount: {plan.amount} GBP</p>
            <p className="mt-2">Created Date: {formatDate(plan.createdDate)}</p>
            <p className="mt-2">
              Expiry Date: {formatDate(new Date(plan.expiryDate))}
            </p>
            {isExpired(plan.expiryDate) && (
              <p className="mt-2 text-red-600 font-bold">Membership Expired</p>
            )}
            <div className="mt-4">
              <QRCode
                value={JSON.stringify({
                  membershipType: plan.membershipType,
                  description: plan.description,
                  name: plan.name,
                  amount: plan.amount,
                  createdDate: formatDate(plan.createdDate),
                  expiryDate: formatDate(new Date(plan.expiryDate)),
                })}
                fgColor="#ff0000"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPlansPage;

import React, { useState } from "react";
import "../Home/membership.css";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { createMembershipDocument } from "../../Firebase/user";
import { useAuth } from "../../Firebase/AuthContext";
import Navbar from "../../components/Home/Navrbar";
import Footer from "../../components/Home/Footer";

function Membershippage() {
  const { currentUser } = useAuth();

  const handlePayment = async (token, membershipType, name, amount) => {
    console.log(token);
    try {
      if (currentUser) {
        // Call the function to create the membership document in Firestore
        const result = await createMembershipDocument(
          currentUser.uid,
          membershipType,
          name,
          amount,
          token.email // Add the email from the token
        );

        if (result.success) {
          console.log("Membership document created successfully!");
        } else {
          console.error("Error creating membership document:", result.message);
        }
      } else {
        console.error("User not logged in.");
      }
    } catch (error) {
      console.error("Error creating membership document:", error.message);
    }
  };

  // Helper function to convert GBP to pence
  const convertToPence = (amountInGBP) => {
    return Math.round(amountInGBP * 100);
  };

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center py-20 mx-7">
        <div className="p-8 border rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Daily Passes</h1>
          <p className="text-gray-600">
            Passes for a single gym from 1 day to 30 days
          </p>
          <p className="mt-4">From</p>
          <p className="text-2xl font-bold">8.99 GBP</p>
          <p className="mt-4">for a day</p>
          <div className="mt-6">
            <StripeCheckout
              token={(token) =>
                handlePayment(
                  token,
                  "Daily Pass",
                  "Passes for a single gym from 1 day to 30 days",
                  8.99
                )
              }
              stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
              key={process.env.REACT_APP_STRIPE_SECRET}
              name="Daily Passes"
              amount={convertToPence(8.99)} // Convert amount to pence
              currency="GBP"
              description="Daily Pass"
            >
              <button className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Select
              </button>
            </StripeCheckout>
          </div>
        </div>
        <div className="p-8 border rounded-lg shadow-lg mt-4 sm:mt-0">
          <h1 className="text-3xl font-bold mb-4">Monthly Passes</h1>
          <p className="text-gray-600">
            Ongoing access to one or multiple gyms
          </p>
          <p className="mt-4">From</p>
          <p className="text-2xl font-bold">19.99 GBP</p>
          <p className="mt-4">for a month</p>
          <div className="mt-6">
            <StripeCheckout
              token={(token) =>
                handlePayment(
                  token,
                  "Monthly Pass",
                  "Ongoing access to one or multiple gyms",
                  19.99
                )
              }
              stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
              key={process.env.REACT_APP_STRIPE_SECRET}
              name="Monthly Passes"
              amount={convertToPence(19.99)} 
              currency="GBP"
              description="Monthly Pass"
            >
              <button className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Select
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Membershippage;

import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../Firebase/AuthContext";
import { useHistory } from "react-router-dom";
import { getUserDocument } from "../../Firebase/user";
import Navbar from "../../components/Home/Navrbar";

const Profile = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // Add user state
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchUserDocument = async () => {
      try {
        const userDoc = await getUserDocument(currentUser.uid);
        setUser(userDoc);
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };

    if (currentUser) {
      fetchUserDocument();
    }
  }, [currentUser]);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleUpdateProfile = () => {
    history.push("/updateprofile");
  };

  const handleBookedactivities = () => {
    history.push("/bookedactivities");
  };
  const handleOrders = () => {
    history.push("/orders");
  };
  const handleKidsslots = () => {
    history.push("/bookedkidsslot");
  };

  const handlemembership = () => {
    history.push("/membershipplanspage");
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center text-white">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white">
            Profile
          </h2>
          {error && (
            <Alert variant="danger" className="text-white">
              {error}
            </Alert>
          )}
          {user && (
            <>
              <strong>Email:</strong>
              {user.email}
            </>
          )}
        </div>
        <div class="grid grid-cols-3 gap-3 py-10">
          <div>
            <button
              type="submit"
              onClick={handleBookedactivities}
              className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Booked Activities
            </button>
          </div>

          <div>
            <button
              type="submit"
              onClick={handlemembership}
              className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Membership plan
            </button>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleOrders}
              className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Order details
            </button>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleKidsslots}
              className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Booked Kids Slots
            </button>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleUpdateProfile}
              className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Profile
            </button>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleLogout}
              className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

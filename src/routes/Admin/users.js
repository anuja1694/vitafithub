import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { Link, useHistory } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const usersRef = firestore.collection("users");
    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => {
        return {
          uid: doc.id,
          ...doc.data(),
        };
      });
      setUsers(users);
    });

    return unsubscribe;
  }, []);

  const deleteUser = (uid) => {
    const userRef = firestore.collection("users").doc(uid);
    userRef
      .delete()
      .then(() => {
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

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
                <th className="border">Uid</th>
                <th className="border">Email</th>
                <th className="border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid}>
                  <td className="border" style={{ width: "300px" }}>
                    {user.uid}
                  </td>
                  <td className="border" style={{ width: "300px" }}>
                    {user.email}
                  </td>
                  <td className="border" style={{ width: "300px" }}>
                    <div className="flex justify-center">
                      <button
                        onClick={() => deleteUser(user.uid)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          width: "80px",
                        }}
                        className="px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

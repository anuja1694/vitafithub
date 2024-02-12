import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Listtrainers() {
  const history = useHistory();
  const [trainers, setTrainers] = useState([]);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainersSnapshot = await firestore.collection("trainers").get();
        const trainersData = trainersSnapshot.docs.map((doc) => doc.data());
        setTrainers(trainersData);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  const deleteTrainer = async (trainerUid) => {
    try {
      // Perform deletion logic here
      console.log("Deleting trainer with UID:", trainerUid);
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
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
                <th className="border">TrainerUid</th>
                <th className="border">Created At</th>
                <th className="border">Name</th>
                <th className="border">Certification</th>
                <th className="border">Email</th>
                <th className="border">Phone</th>
                <th className="border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.trainerUid}>
                  <td className="border" style={{ width: "200px" }}>
                    {trainer.trainerUid}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {trainer.createdAt.toDate().toString()}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {trainer.name}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {trainer.certification}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {trainer.email}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {trainer.phone}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    <div className="flex justify-center">
                      <button
                        onClick={() => deleteTrainer(trainer.trainerUid)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          width: "80px",
                        }}
                        className="px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                      <Link to={`/edit/${trainer.trainerUid}`}>
                        <button
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            width: "80px",
                          }}
                          className="px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                      </Link>
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
}

export default Listtrainers;

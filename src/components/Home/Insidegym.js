import React from "react";
import "../Home/ActivityItemStyles.css";
import gym1 from "../../assets/gym1.jpg";
import gym2 from "../../assets/gym2.jpg";
import gym3 from "../../assets/gym3.jpg";
import gym4 from "../../assets/gym4.jpg";
import gym5 from "../../assets/gym5.jpg";
import gym6 from "../../assets/gym6.jpg";
import gym7 from "../../assets/gym7.jpg";
import gym8 from "../../assets/gym8.jpg";

const activities = [
  { image: gym1 },
  { image: gym2 },
  { image: gym3 },
  { image: gym4 },
  { image: gym5 },
  { image: gym6 },
  { image: gym7 },
  { image: gym8 },
  // Add more activities as needed
];

const InsidegymItem = () => {
  return (
    <div>
      <h1 className="h1">Inside Gym</h1>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div className="activity-item" key={index}>
            <div className="imgcontainer">
              <img className="img" src={activity.image} alt="Activity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsidegymItem;

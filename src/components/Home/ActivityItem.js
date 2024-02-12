import React from "react";
import "../Home/ActivityItemStyles.css";
import swimming from "../../assets/swimming.jpg";
import yoga from "../../assets/yoga.jpg";
import cycle from "../../assets/cycle.jpg";
import BodyToneClass from "../../assets/BodyToneClass.jpg";
import Hittraining from "../../assets/Hit training.jpg";
import Zumba from "../../assets/Zumba.jpg";
import Kettlebell from "../../assets/Kettlebell.jpg";
import Physiotherapy from "../../assets/Physiotherapy.jpg";

const activities = [
  { name: "Swimming", image: swimming },
  { name: "Yoga", image: yoga },
  { name: "Cycle", image: cycle },
  { name: "Body Tone Class", image: BodyToneClass },
  { name: "Hit Training", image: Hittraining },
  { name: "Zumba class", image: Zumba },
  { name: "Kettlebell class", image: Kettlebell },
  { name: "Physiotherapy", image: Physiotherapy },
  // Add more activities as needed
];

const ActivityItem = () => {
  return (
    <div>
      <h1 className="h1">Activities</h1>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div className="activity-item" key={index}>
            <div className="imgcontainer">
              <img className="img" src={activity.image} alt="Activity" />
            </div>
            <p className="p">{activity.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityItem;

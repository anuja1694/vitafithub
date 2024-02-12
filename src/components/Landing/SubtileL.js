import React from "react";
import Image from "../../assets/Image.jpg";
import "../Home/Subtitle.css";
import { Link } from "react-router-dom";

const SubtitleL = () => {
  return (
    <div>
      <h1 className="h1">Services</h1>
      <div className="dflex">
        <div className="column">
          <img className="into-img" src={Image} alt="IntroImg" />
        </div>
        <div className="column">
          <h1 className="h1"> Book slots for kids</h1>
          <p className="p">
            VitaFitHub simplifies the complexities of running a gym by offering
            a unique feature for parents to reserve seats for their children,
            making fitness more accessible for working parents
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubtitleL;

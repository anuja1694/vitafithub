import React from "react";
import { Link } from "react-router-dom";
import "../Home/Subtitlesection.css";
import Image2 from "../../assets/Image2.jpg";

const SubtitlesectionL = () => {
  return (
    <div>
      <div className="dflex">
        <div className="column">
          <h1 className="h1"> fitness programs for every stage of pregnancy</h1>
          <p className="p">
            VitaFitHub provides exercise programs guided by certified trainers,
            tailored to the unique needs and benefits of women during these
            stages.
          </p>
        </div>
        <div className="column">
          <img className="into-img" src={Image2} alt="IntroImg" />
        </div>
      </div>
    </div>
  );
};

export default SubtitlesectionL;

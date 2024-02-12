import React from "react";
import { Link } from "react-router-dom";
import IntroImg from "../../assets/IntroImg.jpg";
import "../Home/BannerImgStyles.css";
import "../../index.css";

const BannerImg = () => {
  return (
    <div className="hero">
      <div className="mask">
        <img className="into-img" src={IntroImg} alt="IntroImg" />
      </div>
      <div className="content">
        <h1>Unleash Your Inner Beast: Elevate Your Fitness Journey with us</h1>
        <div>
          <Link to="/membershippage" className="btnHome">
            Book Membership
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerImg;

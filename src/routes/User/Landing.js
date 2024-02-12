import React from "react";
import BannerimgL from "../../components/Landing/BannerimgL";
import Footer from "../../components/Home/Footer";
import ActivityItem from "../../components/Home/ActivityItem";
import Insidegym from "../../components/Home/Insidegym";
import Trainers from "../../components/Home/Trainers";
import Membership from "../../components/Home/Membership";
import SubtitleL from "../../components/Landing/SubtileL";
import SubtitlesectionL from "../../components/Landing/SubtitlesectionL";

const Landing = () => {
  return (
    <div>
      <BannerimgL />
      <SubtitleL />
      <SubtitlesectionL />
      <ActivityItem />
      <Insidegym />
      <Trainers />
      <Membership />
      <Footer />
    </div>
  );
};

export default Landing;

import React from "react";
import Navbar from "../../components/Home/Navrbar";
import BannerImg from "../../components/Home/BannerImg";
import Subtitle from "../../components/Home/Subtitle";
import Subtitlesection from "../../components/Home/Subtitlesection";
import Footer from "../../components/Home/Footer";
// import ActivityItem from "../../components/Home/ActivityItem";
// import Insidegym from "../../components/Home/Insidegym";
// import Trainers from "../../components/Home/Trainers";
import Membership from "../../components/Home/Membership";

const Home = () => {
  return (
    <div>
      <Navbar />
      <BannerImg />
      <Subtitle />
      <Subtitlesection />
      {/* <ActivityItem />
      <Insidegym />
      <Trainers />
      <Slidertest /> */}
      <Membership />
      <Footer />
    </div>
  );
};

export default Home;

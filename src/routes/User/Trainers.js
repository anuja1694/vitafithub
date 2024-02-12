import React from "react";
import Navbar from "../../components/Home/Navrbar";
import CardList from "../../components/Home/Card";

const Trainers = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <CardList />
      </div>
    </div>
  );
};

export default Trainers;

import React from "react";
import Image from "../../assets/Image.jpg";
import "../Home/Subtitle.css";
import { Link } from "react-router-dom";

const Subtitle = () => {
  return (
    <div className="service-section">
      <h1 className="py-10 text-3xl">Services</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div class="w-full md:w-auto">
          <img class="into-img" src={Image} alt="IntroImg" />
        </div>

        <div class="grid place-items-center h-screen">
          <div>
            <h1 class="text-3xl py-5">Book slots for kids</h1>
            <p>
              VitaFitHub simplifies the complexities of running a gym by
              offering a unique feature for parents to reserve seats for their
              children, making fitness more accessible for working parents
            </p>
            <div class="btnkids">
              <Link to="/kidsslot" class="btnsubtitle">
                Book slots for kids
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subtitle;

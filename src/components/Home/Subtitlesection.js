import React from "react";
import { Link } from "react-router-dom";
import "../Home/Subtitlesection.css";
import Image2 from "../../assets/Image2.jpg";

const Subtitlesection = () => {
  return (
    // <div className="dflex">
    //   <div>
    //     <div className="column dflexBookcontent">
    //       <h1>Fitness programs for every stage of pregnancy</h1>
    //       <p>
    //         VitaFitHub provides exercise programs guided by certified trainers,
    //         tailored to the unique needs and benefits of women during these
    //         stages.
    //       </p>
    //       <div className="btnkids">
    //         <Link to="/kidsslot" className="btnsub">
    //           Book Seats
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="column">
    //       <img className="into-img" src={Image2} alt="IntroImg" />
    //     </div>
    //   </div>
    // </div>

    <div className="service-section">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div class="grid place-items-center h-screen">
          <div>
            <h1 class="text-3xl py-5">
              Fitness programs for every stage of pregnancy
            </h1>
            <p>
              VitaFitHub provides exercise programs guided by certified
              trainers, tailored to the unique needs and benefits of women
              during these stages.
            </p>
            <div class="btnkids">
              <Link to="/activities" class="btnsubtitle">
                Book Seats
              </Link>
            </div>
          </div>
        </div>

        <div class="w-full md:w-auto">
          <img className="into-img" src={Image2} alt="IntroImg" />
        </div>
      </div>
    </div>
  );
};

export default Subtitlesection;

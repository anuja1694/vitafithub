import { Link } from "react-router-dom";
import "../Home/NavbarStyles.css";
import { FaBars, FaTimes } from "react-icons/fa";

import React, { useState } from "react";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to={"/"}>
        <h1>Vitafithub</h1>
      </Link>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/activities">Activities</Link>
        </li>
        <li>
          <Link to="/trainers">Trainers</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/kidsslot">Kids Slot</Link>
        </li>
        <li>
          <Link to="/Profile">Profile</Link>
        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={30} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={30} style={{ color: "#fff" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;

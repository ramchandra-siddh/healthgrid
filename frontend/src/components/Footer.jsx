import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* --------Left Section------------ */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Dedicated to providing expert care, advanced medical facilities, and
            compassionate service. At HealthGrid, your health is our top
            priority. Reach out to us for appointments, emergency support, or
            any healthcare-related queries. We’re here for you—every step of the
            way.
          </p>
        </div>
        {/* --------Center Section------------ */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="py-1">
              <Link onClick={() => scrollTo(0, 0)} to="/">
                Home
              </Link>
            </li>
            <li className="py-1">
              <Link onClick={() => scrollTo(0, 0)} to="/about">
                About us
              </Link>
            </li>
            <li className="py-1">
              <Link onClick={() => scrollTo(0, 0)} to="/contact">
                Contact us
              </Link>
            </li>
            <li className="py-1">
              <Link onClick={() => scrollTo(0, 0)} to="">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
        {/* --------Right Section------------ */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 - 123-456-7890</li>
            <li>healthgrid@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* --------Copyright Text------------ */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 Ramchandra - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

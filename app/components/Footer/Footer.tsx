"use client";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  return (
    <div className="mx-auto w-4/5 p-4 flex justify-between items-center text-white opacity-80">
      <div className="w-1/2 text-sm md:text-base">
        © 2024 TaskMaster, Inc. All rights reserved
      </div>
      <div className="w-1/2 flex justify-end  gap-3 sm:gap-4 md:gap-6 lg:gap-4 xl:gap-2">
        <a href="https://www.instagram.com/kaleidokaii/?hl=en">
          <InstagramIcon   />
        </a>
        <a href="https://x.com/kylobun">
          <XIcon   />
        </a>
        <a href="#">
          <FacebookIcon   />
        </a>
        <a href="https://www.linkedin.com/in/dhanush-pachabhatla-349232332/?trk=opento_sprofile_details">
          <LinkedInIcon   />
        </a>
      </div>
    </div>
  );
};

export default Footer;


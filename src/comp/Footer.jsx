import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer = () => {
  const { i18n } = useTranslation();

  if (i18n.language === "ar") {
    return (
      <div className="myfooter">
        <footer dir="rtl" className="ali">
          <span>
        
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
          تم التصميم بواسطة على حسن
        </footer>
      </div>
    );
  } else if (i18n.language === "en") {
    return (
      <div className="myfooter">
        <footer dir="ltr" className="ali">
          Designed and Developed by Courses4Arab.com
          <span>
      
            <i className="fa-solid fa-heart"></i>
          </span>
        </footer>
      </div>
    );
  } else if (i18n.language === "fr") {
    return (
      <div className="myfooter">
        <footer dir="ltr" className="ali">
          la conception Et développée selon Courses4Arab.com
          <span>
        
            <i className="fa-solid fa-heart"></i>
          </span>
        </footer>
      </div>
    );
  }

  return (
    <div className="myfooter">
      <footer className="ali">
        {i18n.language === "ar" && "تم التصميم بواسطة على حسن "}
        {i18n.language === "en" && "Designed and developed by Courses4Arab.com"}

        <span>
          {" "}
          <i className="fa-solid fa-heart"></i>{" "}
        </span>
      </footer>
    </div>
  );
};

export default Footer;

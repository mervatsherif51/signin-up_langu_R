import React from "react";
import Header from "./header";
import Footer from "./Footer";
import "./Loading.css";

const Loading = () => {
  return (
    <div>
      <Header />
      <main>
        Loading ........
        <div className="loading"></div>
      </main>

      <Footer />
    </div>
  );
};

export default Loading;

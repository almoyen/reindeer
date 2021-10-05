import React from "react";
//import SubPage from "../SubPage";
//import Footer from "../Footer";
import MediumSlide from "../MediumSlide";

function MainPage({ setDefaultCity, defaultCity }) {
  return (
    <>
      <MediumSlide setDefaultCity={setDefaultCity} defaultCity={defaultCity} />
      {/*    <SubPage />
      <Footer /> */}
    </>
  );
}

export default MainPage;

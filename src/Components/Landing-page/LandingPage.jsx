import React from "react";
//import SubPage from "../SubPage";
//import Footer from "../Footer";
import OrderForm from "../OrderForm";

function MainPage({ setDefaultCity, defaultCity }) {
  return (
    <>
      <OrderForm setDefaultCity={setDefaultCity} defaultCity={defaultCity} />
      {/*    <SubPage />
      <Footer /> */}
    </>
  );
}

export default MainPage;

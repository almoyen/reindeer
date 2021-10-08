import React from "react";
//import SubPage from "../SubPage";
//import Footer from "../Footer";
import OrderForm from "../OrderForm";

function MainPage({ searchInput, setSearchInput }) {
  return (
    <>
      <OrderForm searchInput={searchInput} setSearchInput={setSearchInput} />
      {/*    <SubPage />
      <Footer /> */}
    </>
  );
}

export default MainPage;

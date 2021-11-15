import React from "react";
//import SubPage from "../SubPage";
//import Footer from "../Footer";
import OrderForm from "../OrderForm";

function MainPage({ searchField, setSearchField }) {
  return (
    <>
      <OrderForm searchInput={searchField} setSearchField={setSearchField} />
      {/*    <SubPage />
      <Footer /> */}
    </>
  );
}

export default MainPage;
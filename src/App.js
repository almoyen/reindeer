import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { LandingPage, FoodModal, Navbar } from "./Components";

function App() {
  //const [defaultCity, setDefaultCity] = useState("Helsinki");
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <Navbar />

      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <LandingPage
              {...props}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          )}
        />

        <Route path="/orders" render={(props) => <FoodModal {...props} />} />
      </Switch>
    </>
  );
}

export default App;

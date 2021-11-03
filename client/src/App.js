import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { LandingPage, FoodContent, Navbar } from "./Components";
/* import Pra from "./Components/Reusable-components/pra"; */

function App() {
  const [searchField, setSearchInput] = useState("");

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
              searchField={searchField}
              setSearchInput={setSearchInput}
            />
          )}
        />

        <Route path="/orders" render={(props) => <FoodContent {...props} />} />
        {/*  <Route path="/pra" render={(props) => <Pra {...props} />} /> */}
      </Switch>
    </>
  );
}

export default App;

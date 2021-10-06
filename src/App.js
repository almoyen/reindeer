import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { LandingPage, FoodContent, Navbar } from "./Components";

function App() {
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

        <Route path="/orders" render={(props) => <FoodContent {...props} />} />
      </Switch>
    </>
  );
}

export default App;

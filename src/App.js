import React, { useState } from "react";
import { Route, Switch } from "react-router";

import { Navbar } from "./Components";
import { LandingPage, FoodContentPage } from "./pages";

function App() {
  const [searchField, setSearchInput] = useState("");
  const [searchItemField, setSearchItemsField] = useState("");

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
        <Route
          path="/orders"
          render={(props) => (
            <FoodContentPage
              searchItemField={searchItemField}
              setSearchItemsField={setSearchItemsField}
              {...props}
            />
          )}
        />
      </Switch>
    </>
  );
}

export default App;

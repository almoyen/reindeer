import React, { useState } from 'react'
import { Route, Switch } from 'react-router'
import { LandingPage, FoodContent, Navbar } from './Components'
//import MobileLayout from './Components/Reusable-components/mobileView'
//import Prac from './Components/Reusable-components/unusedComponents'

function App() {
  const [searchField, setSearchInput] = useState('')
  const [searchItemField, setSearchItemsField] = useState('')

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
            <FoodContent
              searchItemField={searchItemField}
              setSearchItemsField={setSearchItemsField}
              {...props}
            />
          )}
        />
      </Switch>
    </>
  )
}

export default App

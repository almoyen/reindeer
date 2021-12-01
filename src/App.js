import React, { useState } from 'react'
import { Route, Switch } from 'react-router'
import { LandingPage, FoodContent, Navbar } from './Components'
import MobileLayout from './Components/Reusable-components/mobileView'
import Prac from './Components/Reusable-components/unusedComponents'

function App() {
  const [searchField, setSearchInput] = useState('')

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
        <Route path="/pra" render={(props) => <Prac {...props} />} />
        <Route
          path="/MobileLayout"
          render={(props) => <MobileLayout {...props} />}
        />
      </Switch>
    </>
  )
}

export default App

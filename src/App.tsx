import React, { useState, useContext } from 'react';
// Components
import HeaderNav from './Components/HeaderNav';
import MobileNav from './Components/MobileNav';
// React Router
import { BrowserRouter as Router, Switch, Route, Link, useHistory, RouteComponentProps } from "react-router-dom";
// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
// iOS 100vh issue
import Div100vh from 'react-div-100vh'
// Custom CSS
import './App.css'
// Some typescript junk
import { isWhiteSpaceLike } from 'typescript';
import { resourceLimits } from 'worker_threads';
// Routes
import routes from './Config/routes';
import AuthRoute from './Components/AuthRoute/AuthRoute';
import { auth } from './Config/firebase';


export const UserContext = React.createContext("")
export const UserDataContext = React.createContext("")



function App() {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [userId, setUserId] = React.useState<string>('')
  
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user detected')
        setUserId(user.uid)
      }
      else {
        console.log('no user detected')
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <Div100vh className="center2">
        <CircularProgress />
      </Div100vh>
    )
  }
  
  return (
    <UserContext.Provider value={userId}>   
        <Router>
          <div>
            <HeaderNav/>
            {/* Pages */}
              <Switch>
                {routes.map((route, index) => 
                  <Route 
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(routeProps: RouteComponentProps<any>) => {
                      if (route.protected) {
                        return <AuthRoute><route.component {...routeProps} /></AuthRoute>
                      }
                      return <route.component {...routeProps} />
                    }}
                  />
                )}
              </Switch>
            {/* Mobile Nav */}
            <MobileNav/>
          </div>
        </Router>
    </UserContext.Provider>
  );
}

export default App;

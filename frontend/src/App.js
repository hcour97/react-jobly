import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import NavBar from "./navigation/NavBar";
import JoblyApi from "./api/api";
import Paths from "./navigation/Paths";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";


// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook..
 *
 * App -> Routes
 */

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  console.debug("App", "infoLoaded=", infoLoaded, "currentUser=", currentUser, "token=", token);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the API class to be used when you call the API
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username); 
          setCurrentUser(currentUser);
          //setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

/** Handles signup for app.
 * Automatic login, when signup form is submitted.
 */
async function signup(signupData) {
  try {
    let token = await JoblyApi.signup(signupData); // must add this to JoblyApi!!!!
    setToken(token);
    return { success: true };
  } catch (errs) {
    console.error("signup failed", errs);
    return { success: false, errs };
  }
}

/** Handles login. */
async function login(loginData) {
  try {
    let token = await JoblyApi.login(loginData);
    setToken(token);
    return { success: true };
  } catch (errs) {
    console.error("login failed", errs);
    return {success: false, errs}
  }
}

/** Handles sitewide logout.*/
function logout() {
  setCurrentUser(null);
  setToken(null);
}

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Paths login={login} signup={signup} />
      </BrowserRouter>
    </div>
  );
}

export default App;

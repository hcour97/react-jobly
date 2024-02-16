import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import NavBar from "./navigation/NavBar";
import JoblyApi from "./api/api";
import Paths from "./navigation/Paths";



// Key name for storing token in localStorage for "remember me" re-login
// export const TOKEN_STORAGE_ID = "jobly-token";

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
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  console.debug("App", "infoLoaded=", infoLoaded, "currentUser=", currentUser, "token=", token);

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

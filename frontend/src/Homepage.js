import React from "react";

/** root web page.
 *  If a user is logged in, display welcome message.
 *  If no user is logged in, display login or signup.
 */

const Homepage = () => {
    return (
        <div className="Homepage">
            <h1>Welcome to Jobly. </h1>
            <h2>This is the Homepage.</h2>
        </div>
    )
}

export default Homepage;
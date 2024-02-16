import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "../user/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";

/** site-wide routes */

function Paths({ login, signup }) {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/companies" element={<CompanyList />} />
                <Route path="/companies/:handle" element={<CompanyDetail />} />
                <Route exact path="/jobs" element={<JobList />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />
                <Route path="/login" element={<LoginForm login={login} />} />
            </Routes>
        </div>
    )
}

export default Paths;
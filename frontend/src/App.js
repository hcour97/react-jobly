import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from "./navigation/NavBar";

import Homepage from "./Homepage";
import CompanyList from "./companies/CompanyList";
import JobList from "./jobs/JobList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/companies" element={<CompanyList />} />
          <Route exact path="/jobs" element={<JobList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";

/** Display a list of all the companies, with a preview description of company. 
 *  
 * Routed at: /companies
 * 
*/

const CompanyList = () => {
    console.debug("CompanyList");
    const [companies, setCompanies] = useState(null);

    // useEffect to run above function when page loads
    useEffect(function getCompaniesOnMount() {
        console.debug("useEffect", "getCompaniesOnMount", "showCompanies")
        showCompanies();
        // console.log(companies);
    }, []) 

    // Function for API call and setCompanies()
    async function showCompanies() {
        console.debug("showCompanies", "ApiCall")
        let res = await JoblyApi.getCompanies();
        setCompanies(res);
        console.log(companies);
    }

    // add loading page/spinner
        
    return (
        <div>
            <h1>Welcome to CompanyList page. </h1>
            {/* map the list of companies into <ul> and <li> components for now */}
            <ul>
                {companies.map(c => (
                    <li>
                        {c.name}
                        <p>{c.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CompanyList;
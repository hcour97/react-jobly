import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import CompanyCard from "./CompanyCard";

/** Display a list of all the companies, with a preview description of company. 
 *  
 * Routed at: /companies
 * State: companies, setCompanies
 * 
*/

function CompanyList() {
    console.debug("CompanyList");

    const [companies, setCompanies] = useState(null);
    // console.log(companies, "how many comps?")

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
        // console.log("how many comps after useEffect:", companies);
    }, []);
    // console.log(companies, "how many comps after UseEffect?")

    /** Triggered when SearchForm submits, resets companies. */
    async function search(name) {
        // console.debug("search", "ApiCall")
        let companies = await JoblyApi.getCompanies(name);
        // console.log("the result is:", companies)
        setCompanies(companies);
        // console.log(companies);
    }

    // search(); // works when it is called outside of useEffect()
    //console.log(companies, "how many comps after search function????") // returning null

    // add loading page/spinner
        
    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search}/>
            {companies !== null ? (
                <div className="companyList-cards">
                        {companies.map(c => (
                            <CompanyCard 
                                id={c.handle}
                                handle={c.handle}
                                name={c.name}
                                logoUrl={c.logoUrl}
                                description={c.description}
                            />
                                
                        ))}
                </div>
            ) : (
                <p>Sorry, no results were found.</p>
            )}
        </div>
    )
}

export default CompanyList;
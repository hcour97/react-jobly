import React from "react";

import "./JobCard.css"

/** Display a preview of information about a job 
 * 
 * Props: id, title, salary, equity, companyName.
 * 
 * Implemented by JobCardList.
*/

function JobCard({ key, id, title, salary, equity, companyName }) {
    console.debug(JobCard);

    return (
        <div className="JobCard card">
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {salary}</small></div>}
          {equity !== null && <div><small>Equity: {equity}</small></div>}
        </div>
      </div>
    )
}

export default JobCard;
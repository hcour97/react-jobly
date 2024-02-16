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
          {salary && <div><small>Salary: $ {addCommas(salary)}</small></div>}
          {equity !== null && <div><small>Equity: {equity}</small></div>}
        </div>
      </div>
    )

    function addCommas(num) {
      let numString = num.toString();
      if (numString[0] === "-") {
          numString = numString.slice(1);
      }
  
      let commaIdx;
      if (numString.includes(".")) {
          commaIdx = numString.indexOf(".")
      } else {
          commaIdx = numString.length;
      }
  
      let decimals = numString.slice(commaIdx);
      let returnString = "";
  
      for (let i=commaIdx-1; i >= 0; i--) {
          returnString = numString[i] + returnString;
          if((commaIdx - i) %3 === 0 && i !==0) {
              returnString = "," + returnString;
          }
      }
      return (num < 0 ? "-": "") + returnString + decimals;
  }
}

export default JobCard;
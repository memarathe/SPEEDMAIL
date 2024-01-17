import { useState } from "react";
// import "./App.css";
import axios from 'axios';
 
export default function AddService() {
  const [companyInput, updateCompanyInput] = useState("");
  const [companyList, updateCompany] = useState([
    { id: 1, compName: "FedEx" },
    { id: 2, compName: "UPS" }
  ]);
  const [nextId, setNextId] = useState(3);
 
  function addNewCompany() {
    if (companyInput === "") {
      alert("Add a company name; kindly don't leave it empty!");
      return;
    }
 
    const newCompany = {
      id: nextId,
      compName: companyInput
    };
 
    const newCompanyList = [...companyList, newCompany];
    updateCompany(newCompanyList);
    updateCompanyInput("");
    setNextId(nextId + 1);
 
    const newService = {
      method: "post",
      url: "https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/service",
      data: {
        service_name: companyInput
      }
    };
 
    axios(newService)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add new company. Please try again.");
      });
  }
 
  function deleteCompany(id) {
    const updatedCompanies = companyList.filter(company => company.id !== id);
    updateCompany(updatedCompanies);
  }
 
  return (
    <>
      <div className="container mt-5 w-25">
        <h3 className="text-center">Select Various Delivery Services</h3>
        <div className="input-group">
          <input
            className="form-control"
            onChange={(e) => updateCompanyInput(e.target.value)}
            type="text"
            value={companyInput}
          />
          <button onClick={addNewCompany} className="btn btn-primary">
            Add
          </button>
        </div>
        <ul className="list-group mt-4">
          {companyList.map(company => (
            <li className="list-group-item" key={company.id}>
              <p>{company.compName}</p>
              <button onClick={() => deleteCompany(company.id)} className="btn">
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
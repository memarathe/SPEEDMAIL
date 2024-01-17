import './AddEmployeeForm.css'
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function AddEmployeeForm() {
  const [id, setName] = useState('');
  const [employeeIDError, setNameError] = useState('');

  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    
    e.preventDefault();
    // Validate the "Name" field
    if (!/^[a-zA-Z0-9\s]+$/.test(id)) {
      setNameError('EmpID should only contain letters');
      return;
    } else {
      setNameError('');
    }
    try{
      console.log("value read",id)
        // set configurations for the API call here
        const configuration = {
          method: "GET",
          url: `https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/getDriverData/${id}`,
        };
        // make the API call
        console.log("before calling axios")
        const response = await axios(configuration);
        console.log(response);
        navigate('/displaydriverdetails', { state: { driverData: response.data } });
      }catch{
      console.error('Error fetching data:', employeeIDError);
    }

  };

  return (
    <div>
      <h2>Search Employee</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="employeeID">Employee ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <p className="error-message">{employeeIDError}</p>
        <br />
        
        <button id="submit-button" type="submit">Search Employee</button>
        <button id="submit-button1" type="reset">Reset Form</button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;

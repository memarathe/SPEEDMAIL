import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
function QueryCustomerForm() {
  const [sender_name, setCustomerQuery] = useState('');
  const [queryError, setQueryError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { customerData } = location.state || {};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validate the "Customer Name or ID" field
    if (!/^[a-zA-Z0-9\s]+$/.test(sender_name)) {
      setQueryError('Invalid input. Please use letters and numbers.');
      return;
    } else {
      setQueryError('');
    }
    try{
      console.log("value read",sender_name)
        // set configurations for the API call here
        const configuration = {
          method: "GET",
          url: `https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/getCustomerData/${sender_name}`,
        };
        // make the API call
        console.log("before calling axios")
        const response = await axios(configuration);
        console.log(response);
        navigate('/DisplayCustomerDetails', { state: { customerData: response.data } });
      }catch{
      console.error('Error fetching data:', queryError);
    }
  };

  return (
    <div>
      <h2>Query Customer Data</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="customerQuery">Customer ID:</label>
        <input
          type="text"
          id="customerQuery"
          value={sender_name}
          onChange={(e) => setCustomerQuery(e.target.value)}
          required
        />
        <p className="error-message">{queryError}</p>
        <button id="submit-buttonSearch" type="submit">Search</button>
        <button id="submit-buttonClear" type="reset">Clear</button>
      </form>
    </div>
  );
}

export default QueryCustomerForm;
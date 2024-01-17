import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function DisplayDriverDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { driverData } = location.state || {};

  return (
    <div>
      <h1>The Driver details</h1>
      <br/>
      {driverData ? (
        <div>
          {/* Display your data here */}
          <p>Driver ID: {driverData._id}</p>
          <p>First Name: {driverData.firstname}</p>
          <p>Last Name: {driverData.lastname}</p>
          <p>Email: {driverData.email}</p>
          <p>Phone Number: {driverData.phone}</p>
          <p>User Type: {driverData.user_type}</p>
          {/* <pre>{JSON.stringify(driverData, null, 2)}</pre> */}
          <button onClick={() => navigate('/Manager')}>Back</button>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default DisplayDriverDetails;

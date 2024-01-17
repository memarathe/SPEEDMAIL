// AssignDriverButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AssignDriverButton() {
  const navigate = useNavigate()
  const handleButtonClick = () => {
    navigate('/assign_driver');
  }
  const handleButtonClicked = () => {
    navigate("/add-courier-service")
  }
  return (
    <div>
      <button id="submit-buttonAD" type="submit" onClick={handleButtonClick}>Assign Driverrr</button>
      <button id="submit-buttonAD" type="submit" onClick={handleButtonClicked}>Add Service</button>
    </div>
  );
}

export default AssignDriverButton;
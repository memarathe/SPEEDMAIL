import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function DisplayCustomerDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerData } = location.state || {};

  return (
    <div>
      <h1>The Customer order details</h1>
      <br/>
      {customerData ? (
        <div>
          {/* Display your data here */}
          {customerData.map((order) => (
            <div key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Sender Name: {order.sender_name}</p>
            <p>Receiver Name: {order.receiver_name}</p>
            <p>Length of Package: {order.length_of_pkg}</p>
            <p>Width of Package: {order.width_of_pkg}</p>
            <p>Sender Phone: {order.sender_phone}</p>
            <p>Receiver Phone: {order.receiver_phone}</p>
            <p>Sender Address: {order.sender_adr}</p>
            <p>Receiver Address: {order.receiver_adr}</p>
            <p>Service Used: {order.service_used}</p>
            <p>Delivery Date: {order.delivery_date}</p>
            <p>Amount: {order.amount}</p>
              <hr /> {/* Add a horizontal line between entries */}
            </div>
          ))}
          <button onClick={() => navigate('/Manager')}>Back</button>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default DisplayCustomerDetails;

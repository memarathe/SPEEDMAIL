import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

const PastOrders = () => {
  const { email } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Make a request to your server to fetch orders based on the email
        const response = await axios.get(`https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/orderss/${token[3]}`);
        setOrders(response.data); // Assuming the response contains the orders data
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [email]);

  return (
    <div>
      <h1>Orders for {email}</h1>
      <ul>
        {orders.map(order => (
          <>
          <li key={order._id}>
            {/* Display order details as needed */}
            <p>Order id: {order._id}</p>
            <p>Sender's Name: {order.sender_name}</p>
            <p>Receiver's Name: {order.receiver_name}</p>
            <p>Status: {order.order_status}</p>
            {/* Add more order details as needed */}
          </li>
          <br/>
          </>
        ))}
      </ul>
    </div>
  );
};

export default PastOrders;


// import React from 'react'
// import { useParams } from 'react-router-dom'

// const PastOrders = () => {
//     const { id } = useParams();
//     console.log(id)
//   return (
//     <h1>{id}</h1>
//   )
// }

// export default PastOrders
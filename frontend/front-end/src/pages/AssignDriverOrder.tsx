// ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const AssignDriverOrder = () => {
  const [items, setItems] = useState([]);
  const { driver_id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/orders');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFinalAssign = async (id) => {
    try {
        console.log(driver_id)
        await axios.put(`https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/assign?driver_id=${driver_id}&order_id=${id}`)
        alert(`order ${id} assigned to driver ${driver_id}`)
        navigate("/assign_driver")
    //   await axios.delete(`https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/delete_service/${id}`);
    //   // Update the items list after deletion
    //   setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  return (
    <div>
      <h2>Item List:</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.sender_name} - {item.receiver_adr}{' '}
            <button onClick={() => handleFinalAssign(item._id)}>Assign</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignDriverOrder;

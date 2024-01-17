// ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignDriver = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/driver_list');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAssign = async (id) => {
    
    navigate(`/assign_driver/${id}`)
    // try {
    //   await axios.delete(`https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/delete_service/${id}`);
    //   // Update the items list after deletion
    //   setItems(items.filter(item => item._id !== id));
    // } catch (error) {
    //   console.error('Error deleting item:', error.message);
    // }
  };

  return (
    <div>
      <h2>Driver List:</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.firstname} - {item.lastname}{' '}
            <button onClick={() => handleAssign(item._id)}>Assign</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignDriver;

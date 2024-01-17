// ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/services_details');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/delete_service/${id}`);
      // Update the items list after deletion
      setItems(items.filter(item => item._id !== id));
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
            {item.service_name} - {item.price}{' '}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;

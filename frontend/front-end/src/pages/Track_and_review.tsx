// ValuesList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Track_and_review = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    // Fetch data from the Express backend when the component mounts
    axios.get('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/order_details')
      .then(response => {
        setValues(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>List of Values:</h2>
      <ul>
        {values.map(value => (
          <li key={value._id}>{value.sender_name} - {value.receiver_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Track_and_review;

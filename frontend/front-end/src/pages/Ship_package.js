// import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
export default function Shippackagedetails() {
  const [values, setValues] = useState({
    sender_name: "",
    receiver_name: "",
    length_of_pkg: "",
    width_of_pkg:"",
    sender_phone: "",
    receiver_phone:"",
    sender_adr:"",
    receiver_adr:"",
    service_used:"",
    delivery_date:"",
    amount:"",
    driver_id:"",
    order_status:"",
  })
//   let menuRef = useRef();
  
  const handleInputChange = (event) => {
    /* event.persist(); NO LONGER USED IN v.17*/
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.sender_name && values.receiver_name && values.length_of_pkg && values.sender_phone && values.receiver_phone && values.width_of_pkg) {
      setValid(true);
    }
    setSubmitted(true);
    navigate('/Ship_package_maps',{ state: { values } })
  };
  useEffect(() => {
    let handler = (e)=>{     
    };
    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
},[]);
  return (
    <div className="form-container">
      <form className="shipping" onSubmit={handleSubmit}>
        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Sender's name"
            name="sender_name"
            value={values.sender_name}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.sender_name && (
          <span id="sender's-name-error">Please enter your name</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Receiver's name"
            name="receiver_name"
            value={values.receiver_name}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.receiver_name && (
          <span id="receiver's-name-error">Please enter a receiver's name</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Enter the approximate length of package"
            name="length_of_pkg"
            value={values.length_of_pkg}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.length_of_pkg &&(
          <span id="length_of_pkg-error">Please enter a valid length</span>
        )}
        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Enter the approximate width of the package"
            name="width_of_pkg"
            value={values.width_of_pkg}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.width_of_pkg &&(
          <span id="width_of_pkg-error">Please enter a valid width</span>
        )}
        {!valid && (
          <input
            className="form-field"
            type="text"
            pattern="[0-9]*"
            minLength="10"  
            placeholder="Enter sender's phone number"
            name="sender_phone"
            value={values.sender_phone}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.sender_phone && values.sender_phone.length === 10 && (
          <span id="sender phone-error">Please enter a sender's hone number</span>
        )}
        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Enter receiver's phone number"
            name="receiver_phone"
            value={values.receiver_phone}
            onChange={handleInputChange}
          />
        )}
      {submitted && !values.receiver_phone && (
          <span id="receiver phone-error">Please enter the receiver's phone</span>
        )}
      {!valid && (
        <button className="form-field" type="submit">
          Next
        </button>
      )}
      </form>
    </div>
  );
}
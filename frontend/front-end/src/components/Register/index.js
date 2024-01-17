import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import QRCode from 'qrcode.react';

export default function Register() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    answer:"",
    password:""
  })
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedusertype, setSelectedusertype] = useState("");
  const [qrCode, setQrCode] = useState('');
  let menuRef = useRef();
  let registerButtonRef = useRef();
  const handleInputChange = (event) => {
    /* event.persist(); NO LONGER USED IN v.17*/
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };
  const handleSecurityQuestionChange = (event) => {
    event.preventDefault();
    setSelectedQuestion(event.target.value); 
  };
  const handleSecurityusertypeChange = (event) => {
    event.preventDefault();
    setSelectedusertype(event.target.value); 
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [regis,setRegistered] = useState(false);
  const navigate = useNavigate()

  const handleClick = (e) => {
    navigate(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("question is ",selectedQuestion);
    console.log("usertype is ",selectedusertype);
    if (values.firstName && values.lastName && values.email && values.phone && selectedQuestion && selectedusertype && values.password) {
      setValid(true);
    }
    setSubmitted(true);
    const registration = {
      method: "post",
      url: "https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/register",
      data: {
        email:values.email,
        password:values.password,
        firstname:values.firstName,
        lastname:values.lastName,
        phone:values.phone,
        user_type:selectedusertype,
        security_question:selectedQuestion,
        security_answer:values.answer,
      },
    };
    console.log("andar aya 1")
    // make the API call
    axios(registration)
      .then((result) => {
        console.log("andar aya 2")
        setRegistered(true);
        setQrCode(result.data.secret);
        // navigate("/login")
      })
      .catch((error) => {
        error = new Error();
      });
  };
  useEffect(() => {
    let handler = (e)=>{
      console.log("??")
      // console.log("menuref", menuRef)
      // console.log("target", e.target)
      // if(!menuRef.current.contains(e.target)){
      //   setOpen(false);
      //   console.log(menuRef.current);
      // }     
    };
    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
},[]);
const securityQuestions = [
  "What is your dog's name?",
  "What is your mother's maiden name?",
  "Which city were you born?",
  "Which is your favorite color?"
];
const typeofuser = [
  "I AM A MANAGER",
  "I AM A USER",
  "I AM A DRIVER"
];
  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        
        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.firstName && (
          <span id="first-name-error">Please enter a first name</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.lastName && (
          <span id="last-name-error">Please enter a last name</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.email &&(
          <span id="email-error">Please enter a valid email id</span>
        )}
        {!valid && (
          <input
            className="form-field"
            type="text"
            pattern="[0-9]*"
            minLength="10"  
            placeholder="Enter your Phone number"
            name="phone"
            value={values.phone}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.phone && values.phone.length < 11 && (
          <span id="phone-error">Please enter a phone number</span>
        )}
        {!valid && (
        <div className="menu-container" ref={menuRef}>
          <div className="menu-trigger">
            <select className="dropdown"
              value={selectedusertype}
              onChange={handleSecurityusertypeChange}
            >
              <option value="">Select who you are</option>
              {typeofuser.map((question, index) => (
                <option key={index} value={question}>
                  {question}
                </option>
              ))}
            </select>
          </div>
        </div>
        )}
        {open && !selectedusertype && (
        <span id="usertype-error">Please select who you are</span>
      )}
        {!valid && (
        <div className="menu-container" ref={menuRef}>
          <div className="menu-trigger">
            <select className="dropdown"
              value={selectedQuestion}
              onChange={handleSecurityQuestionChange}
            >
              <option value="">Select a security question</option>
              {securityQuestions.map((question, index) => (
                <option key={index} value={question}>
                  {question}
                </option>
              ))}
            </select>
          </div>
        </div>
        )}
      {open && !selectedQuestion && (
        <span id="security-error">Please select a security question</span>
      )}
       
      {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Answer to security question"
            name="answer"
            value={values.answer}
            onChange={handleInputChange}
          />
      )}
      {submitted && !values.answer && (
          <span id="security question-error">Please enter the answer</span>
        )}
      {!valid && (
          <input
            className="form-field"
            type="password"
            minLength="8"
            placeholder="Enter a new password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.password && (
          <span id="password-error">Please enter a valid password</span>
        )}
      {!valid && (
        <button className="form-field" type="submit">
          Register
        </button>
      )}
      {regis ? (
          <p >You Are Registered Successfully! Redirecting to login</p>
        ) : (
          <p>Already registered? <Link to={"/login"}>Login</Link></p>
        )}
        {qrCode && (
        <div>
          <h3>Scan QR Code with Authenticator App:</h3>
          <QRCode value={qrCode} />
        </div>
      )}
      </form>
    </div>
  );
}
function DropdownItem(props){
  return(
    <li className = "dropdownItem">
       <a onClick={() => props.onSelect(props.text)}>{props.text}</a>
    </li>
  );
}
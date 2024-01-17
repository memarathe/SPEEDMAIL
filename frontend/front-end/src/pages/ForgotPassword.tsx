import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate()

  const handleVerifyEmail = async () => {
    // Make an API request to check if the email exists in the database
    // You'll need to replace the placeholder with your actual API endpoint
    const response = await fetch('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/check_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.exists) {
      setStep(2); // Move to the next step
    } else {
      alert('Email not found in the database');
    }
  };

  const handleVerifySecurityAnswer = async () => {
    // Make an API request to verify the security answer
    const response = await fetch('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/verify_security_answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, securityAnswer }),
    });

    const data = await response.json();

    if (data.correct) {
      const response = await fetch('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
      })
      setStep(3); // Move to the next step
      
    } else {
      alert('Incorrect security answer');
    }
  };

  const handleVerifyOtp = async () => {
    // Make an API request to verify the OTP
    const response = await fetch('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/verify_otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:email, token:otp}),
    });

    const data = await response.json();

    if (data.valid) {
      setStep(4); // Move to the next step
    } else {
      alert('Invalid OTP');
    }
  };

  const handleSetNewPassword = async () => {
    // Make an API request to update the password
    await fetch('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/update_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    });

    alert('Password updated successfully');
    // Redirect the user to the login page or any other desired location
    navigate("/login")
    // You can use React Router for navigation
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleVerifyEmail}>Verify Email</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label>Security Question:</label>
          {/* Display the security question based on the user's email */}
          <p>{securityQuestion}</p>
          <label>Security Answer:</label>
          <input type="text" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} />
          <button onClick={handleVerifySecurityAnswer}>Verify Security Answer</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <label>Enter OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={handleSetNewPassword}>Set New Password</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;

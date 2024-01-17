import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import LoginStyles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signinGoogle, signin } from "../../redux/actions/auth.js"
const cookies = new Cookies();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('');
  const [login, setLogin] = useState(false);

  async function getUserInfo(accessToken) {
    // Example: Using the Google People API to get user info
    const url = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`;

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
    // return fetch(url, {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //   },
    // })
    //   .then(response => response.json())
    //   .then(data => data.emailAddresses[0].value);
  }

  async function handleGoogleLoginSuccess(tokenResponse) {
    try {
      const accessToken = tokenResponse.access_token;
      console.log(accessToken);

      const userInfo = await getUserInfo(accessToken);
      console.log("inside getUserInfo then block");
      const userEmail = userInfo.email;

      await axios({
        method: 'post',
        url: "https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/login_google",
        data: {userEmail}
      })
        .then((result) => {
          console.log("then block?")
          console.log(result)

          // set the cookie
          cookies.set("TOKEN", [result.data.token, result.data.id, result.data.role, result.data.email], {
            path: "/",
          });

          // redirect user to the auth page
          window.location.href = `/user/${result.data.id}`;

          setLogin(true);
        })
        .catch((error) => {
          console.log("catch block?")
          console.log(error.message)
        })


    } catch (error) {
      console.log("Error:", error);
      alert(error.message);
    }
  }


  const loginf = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/login",//"https://nodejs-mongodb-auth-app.herokuapp.com/login",
      data: {
        email,
        password,
        token
      },
    };

    // make the API call
    await axios(configuration)
      .then((result) => {
        // set the cookie
        cookies.set("TOKEN", [result.data.token, result.data.id, result.data.role, result.data.email], {
          path: "/",
        });
        // redirect user to the auth page
        window.location.href = `/user/${result.data.id}`;

        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        <div>
          <label>2FA Token:</label>
          <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
        </div>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
        <button onClick={() => loginf()} className={LoginStyles.googleBTN}>
          <i class="fa-brands fa-google"></i>  Sign in with google</button>
        <Link to={'/forgot_password'}>Forgot Password?</Link>

        {/* display success message */}
        {login ? (
          <p >You Are Logged in Successfully</p>
        ) : (
          <p>You Are Not Logged in</p>
        )}
      </Form>
    </>
  );
}

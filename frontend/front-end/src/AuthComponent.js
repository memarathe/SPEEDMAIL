import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { Navigate, useParams } from "react-router-dom";
import ManagerComponent from "./components/ManagerComponent.tsx";
import UserComponent from "./components/UserComponent.tsx";
import DriverComponent from "./components/DriverComponent.tsx";
import Shippackagedetails from "./pages/Ship_package.js";
import DriverPage from "./pages/DriverPage.js";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");
// console.log("token is ", token)

export default function AuthComponent() {
  const { param } = useParams();
  const [user, setUser] = useState("")
  const [manager, setManager] = useState("")
  const [driver, setDriver] = useState("")
  console.log(param)
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: `https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/auth-endpoint/`,//"https://nodejs-mongodb-auth-app.herokuapp.com/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token[0]}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        console.log(result)
        // assign the message in our result to the message we initialized above
        console.log(result.data)
        setMessage(result.data.user);
      })
      .catch((error) => {
        error = new Error();
      });

    const role = token[2].substring(7)
    if (role=="USER") {
      setUser(true)
    } else if (role=="MANAGER") {
      setManager(true)
    } else {
      setDriver(true)
    }

    console.log(token)
  }, []);

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }

  return (
    <div className="text-center">
      {/* <h1>Auth Component</h1> */}
      
      {user && <Shippackagedetails/>/*<UserComponent/>*/}

      {driver && <DriverPage/>/*<DriverComponent/>*/}

      {manager && <ManagerComponent/>}

      {/* displaying our message from our API call */}
      <h3 className="text-danger">{message}</h3>

      {/* logout */}
      {/* <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button> */}
    </div>
  );
}

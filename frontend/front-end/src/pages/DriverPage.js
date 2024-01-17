import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
// import { request } from '../../../back-end/app';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

//Here we will need to send the source address, destination address, Order ID, and driver ID to the map page using the show map button

//We also need to to update the database when an order has been delivered, updating the Status of that order from the database

//Order details such as source address, destination address, and order ID will need to be displayed on the driver page, not sure how to grab those details from the database


const DriverPage = () => {

  const navigate = useNavigate();
  const [isDestinationVisible, setDestinationVisible] = useState(false);

  const [values, setValues] = useState([]);
  /* const addressDetails = {
         method: "GET",
         url: "https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/getAddress",
         data: {
             sender_adr: values.sender_adr,
             receiver_adr: values.receiver_adr,
             order_id: values.order_id,
             driver_id: values.driver_id,
             order_status: values.order_status
         },
     };
     console.log("hello!");
     axios(addressDetails)
     .then((response) => {
         console.log("Here is the data", response.data);
         setValues(response.data);
     })
     .catch((error) =>
         console.error("error",error));
 
         const fetchAddressDetails = async () => {
           try {
             const response = await axios.get('https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/getAddress');
             setValues(response.data);
           } catch (error) {
             console.error('Error fetching address details', error);
           } finally {
             setIsLoading(false);
           }
         };
 */
  /*
  const fetchAddressDetails = () => {
    const url = 'https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/getAddress';
    const params = {
      sender_adr: values.sender_adr,
      receiver_adr: values.receiver_adr,
      order_id: values.order_id,
      driver_id: values.driver_id,
      order_status: values.order_status,
    };
  
    const addressDetails = {
      method: "GET",
      url,
      params,
    };
  
    console.log("Sending GET request:", addressDetails);
  
    axios(addressDetails)
      .then((response) => {
        console.log("Data received:", response.data);
        setValues(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };*/

  const fetchAddressDetails = () => {
    const url = `https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/getAddress?driver_id=${token[1]}`;

    console.log("Sending GET request:", url);

    axios.get(url)
      .then((response) => {
        console.log("Data received:", response.data.orderDetails);
        setValues(response.data.orderDetails);
        console.log("Aa")
        if (response.data.orderDetails.order_status=='picked up') {
          setDestinationVisible(true)
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

  };


  useEffect(() => {
    
    fetchAddressDetails();
  }, []);


  

  const handlePickUpClick = async (values) => {
    const url = `https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/update_order?driver_id=${token[1]}&order_id=${values._id}&order_status=picked up`;

    console.log("Sending GET request:", url);
    console.log("values: ", [token[1], values._id])

    await axios.put(url)
      .then((response) => {
        console.log("Data received:", response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    setDestinationVisible(true);
    window.location.reload()
  }

  const handleShowMapClick = () => {
    const sender_adr1 = values.sender_adr
    const receiver_adr1 = values.receiver_adr
    //send the sender_adr, receiver_adr, driver_id, order_id, order_status to the map page
    // navigate("/Ship_package_maps", { state: { values } });
    navigate('/Ship_package_maps',{ state: { sender_adr1, receiver_adr1 } })
  }



  const handleUpdateOrderStatusClick = async () => {
    //This function will update the database to show that the order has been delivered
    // const orderId = values.order_id;
    // const serverUrl = "https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/orders";

    // axios.put(serverUrl, { orderId }, { order_status: "Delivered" })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log("Error updating order status", error);
    //   });
    const url = `https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/update_order?driver_id=${token[1]}&order_id=${values._id}&order_status=delivered`;

    console.log("Sending GET request:", url);

    await axios.put(url)
      .then((response) => {
        console.log("Data received:", response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    // setDestinationVisible(true);
    window.location.reload()

  }




  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 100 }}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Source</Card.Title>
          {values.order_status!="delivered" && <><Card.Text>
            {values.sender_adr}
          </Card.Text>
          <Button variant="primary" onClick={() => handlePickUpClick(values)}> Picked Up Package </Button></>}
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Destination</Card.Title>
          {values.order_status=="picked up" && isDestinationVisible && <Card.Text>
            {values.receiver_adr}
          </Card.Text>}
          <Button variant="primary" onClick={() => handleShowMapClick("/Ship_package_maps")}> show map </Button>
        </Card.Body>
      </Card>


      <Card style={{ width: '18rem' }}>
        <Card.Body>

          <Card.Title>Order ID</Card.Title>
          {/* {values.order_status == "picked up" ? ( */}
          {values.order_status!="delivered" && <><Card.Text>
              {values._id}
            </Card.Text>
          <Button variant="primary" onClick={handleUpdateOrderStatusClick}> Order Delivered </Button></>}
        </Card.Body>
      </Card>

    </div>
  );
}

export default DriverPage;

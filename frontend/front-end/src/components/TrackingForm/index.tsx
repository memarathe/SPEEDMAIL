import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide, Zoom } from "react-awesome-reveal"
import { useForm } from "../../common/utils/useForm.tsx";
import validate from "../../common/utils/validationRules.ts";
import { Button } from "../../common/Button/index.tsx";
import Block from "../Block/index.tsx";
import Input from "../../common/Input/index.tsx";
import TextArea from "../../common/TextArea/index.tsx";
import { TrackingProps } from "../../common/types.ts";
import { ValidationTypeProps } from "../ContactForm/types.ts";
import { ButtonContainer, ContactContainer, FormGroup, Span } from "../ContactForm/styles.ts";
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ... (imports)

const StatusProgressBar = ({ status }) => {
  const getStatusColor = (status) => {
    // Define color codes for different statuses
    switch (status) {
      case 'pending':
        return '#FFD700'; // Yellow for pending status
      case 'shipped':
        return '#008000'; // Green for shipped status
      case 'delivered':
        return '#0000FF'; // Blue for delivered status
      default:
        return '#808080'; // Gray for unknown status
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <strong>Status:</strong>
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: getStatusColor(status),
          marginTop: '8px',
        }}
      ></div>
    </div>
  );
};

const TrackingForm = ({ title, content, t }: TrackingProps) => {
  const navigate = useNavigate()
  // const [id, setId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const { values, errors, handleChange } = useForm(validate) as any;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(e)
      // console.log(id)
      const id = values.trackingNumber
      const response = await axios.get(`https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/order_details/${id}`);
      setOrderDetails(response.data);
    } catch (error) {
      alert("Order not found")
      console.error('Error fetching order details:', error.message);
    }
  };

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type];
    return (
      <Zoom direction="left">
        <Span errors={errors[type]}>{ErrorMessage}</Span>
      </Zoom>
    );
  };

  const handleTrack = (orderDetails) => {
    const sender_adr = orderDetails.sender_adr
    const receiver_adr = orderDetails.receiver_adr
    navigate('/Ship_package_maps',{ state: { sender_adr, receiver_adr } })
  } 

  return (
    <ContactContainer>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="trackingNumber"
                placeholder="Your Tracking Number"
                value={values.trackingNumber || ""}
                onChange={handleChange}
                // when the user hits enter, it will submit the form
                onKeyPress={(e: any) => e.key === "Enter" && handleSubmit(e)}
              />
              {/* Include other form elements, buttons, and ValidationType components here */}
            </FormGroup>
          </Slide>
        </Col>
      </Row>
      {orderDetails && (
        <div>
          <StatusProgressBar status={orderDetails.order_status} />

          {/* Add other content based on the status */}
          {orderDetails.order_status === 'pending' && (
            <div>
              <h2>Order Details</h2>
              <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
            </div>
          )}

          {orderDetails.order_status === 'shipped' && (
            <div>
              <h2>Shipped Details</h2>
              {/* Display other details specific to shipped status */}
            </div>
          )}

          {orderDetails.order_status === 'delivered' && (
            <div>
              <h2>Delivered Details</h2>
              {/* Display other details specific to delivered status */}
            </div>
          )}

          {/* Add more conditions for other statuses if needed */}
          <button onClick={() => handleTrack(orderDetails)}>Track Package</button>
        </div>
      )}
      
    </ContactContainer>
  );
};

export default TrackingForm;


// const TrackingForm = ({ title, content, t}: TrackingProps) => {
//   const [id, setId] = useState('')
//   const [orderDetails, setOrderDetails] = useState(null);
//     const { values, errors, handleChange, /*handleSubmit*/ } = useForm(
//        validate
//     ) as any;

//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       try {
//         alert("??")
//         const response = await axios.get(`/order_details/${id}`);
//         console.log(response)
//         setOrderDetails(response.data);
//       } catch (error) {
//         alert("aa?")
//         console.error('Error fetching order details:', error);
//       }
//     };

//     const ValidationType = ({ type }: ValidationTypeProps) => {
//         const ErrorMessage = errors[type];
//         return(
//         <Zoom direction="left">
//         <Span errors={errors[type]}>{ErrorMessage}</Span>
//       </Zoom>
//     );
//   };
        
//         return(
//     <ContactContainer >
//     <Row justify= "space-between" align = "middle">
//     <Col lg={12} md={11} sm={24} xs={24}>
//         <Slide direction="left">
//         <Block title={title} content={content} />
//         </Slide>
//         </Col>
//         <Col lg={12} md={12} sm={24} xs={24}>
//           <Slide direction="right">
//             <FormGroup autoComplete="off" onSubmit={handleSubmit}></FormGroup>
//             <Input
//                   type="text"
//                   name="Tracking Number"
//                   placeholder="Your Tracking Number"
//                   value={values.TrackingNum || ""}
//                   onChange={handleChange}
//                   //when user hits enter, it will submit the form
//                   onKeyPress={(e: any) => e.key === "Enter" && handleSubmit(e)}
//                 />
                
//                 </Slide>
//                 </Col>
//         </Row> 
//         {orderDetails && (
//         <div>
//           <h2>Order Details</h2>
//           <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
//         </div>
//       )}
//         </ContactContainer>
//         );}
//         export default TrackingForm;
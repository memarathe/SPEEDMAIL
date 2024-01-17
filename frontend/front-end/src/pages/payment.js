// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import StripeCheckout from 'react-stripe-checkout'
// import axios from 'axios'
// export default function Payment() {
//     const location = useLocation();
//     const { values } = location.state || {};
//     console.log("values aya as a parameter", values);
// const [product, setProduct] = useState({
// name:values.service_used,
// price:values.delivery_date,
// productby:values.amount,
// })
// const makePayment = token =>{
//     const order = {
//         method: "post",
//         url: "https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/order",
//         data: {
//           sender_name:values.sender_name,
//           receiver_name:values.receiver_name,
//           length_of_pkg:values.length_of_pkg,
//           width_of_pkg:values.width_of_pkg,
//           sender_phone:values.sender_phone,
//           receiver_phone:values.receiver_phone,
//           sender_adr:values.sender_adr,
//           receiver_adr:values.receiver_adr,
//           service_used:values.service_used,
//           delivery_date:values.delivery_date,
//           amount:values.amount,
//           driver_id:values.driver_id,
//           order_status:values.order_status,
//         },
//       };
//     axios(order)
//     .then((response) => {
//       console.log("payment hua", response.data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// const body = {
// token,
// product,
// }
// const header = {
// "COntent-Type" : "application/json"
// }
// return fetch('http://localhost:5000/payment',{
// method:"POST",
// headers: header,
// body: JSON.stringify(body)
// }).then(
//     (response) => {
// console.log(response)
// })
// .catch((err )=> console.log(err))
  
// }
// return (
// <div className="App">
// <header className="App-header">
// <StripeCheckout stripeKey="pk_test_51OFP8TAurbPnB8fFwGBXov6XMCiarQWuNquJi0chFN41YZDV6qcsRuQTIbwt3EaaYW0J1gRRJXYolbQg97jr657O00HgiyO2OP" token={makePayment} name="Confirm order"/>
// </header>
// </div>
// );
// }
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login
const user_token = cookies.get("TOKEN");
// console.log("token is ", token)

export default function Payment() {
    // console.log("token is", user_token[3])
    const location = useLocation();
    const { values } = location.state || {};
    console.log("values aya as a parameter", values);
    values.order_status = "NA"

    const [product, setProduct] = useState({
        name: values.service_used,
        price: values.amount,
        productby: values.delivery_date,
    });

    const  makePayment = (token) => {
        const order = {
            method: "POST",
            url: "https://aaaaaaaaaaaaaaaa-kaushiks-projects-d8f80fc1.vercel.app/order",
            data: {
                sender_name: values.sender_name,
                receiver_name: values.receiver_name,
                length_of_pkg: values.length_of_pkg,
                width_of_pkg: values.width_of_pkg,
                sender_phone: values.sender_phone,
                receiver_phone: values.receiver_phone,
                sender_adr: values.sender_adr,
                receiver_adr: values.receiver_adr,
                service_used: values.service_used,
                delivery_date: values.delivery_date,
                amount: values.amount,
                driver_id: values.driver_id,
                order_status: values.order_status,
                sender_email: user_token[3],
            },
        };
        axios(order)
            .then((response) => {
                console.log("Axios response:", response);
                console.log("payment hua", response.data);
                const body = {
                    token,
                    product,
                };

                const header = {
                    "Content-Type": "application/json",
                };

                return fetch('http://localhost:5000/payment', {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(body),
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <StripeCheckout stripeKey="pk_test_51OFP8TAurbPnB8fFwGBXov6XMCiarQWuNquJi0chFN41YZDV6qcsRuQTIbwt3EaaYW0J1gRRJXYolbQg97jr657O00HgiyO2OP" token={makePayment} name="Confirm order" />
            </header>
        </div>
    );
}

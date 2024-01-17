import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RecommendService() {
  const location = useLocation();
  const { values } = location.state || {};
  console.log("values aya as a parameter", values);
  const navigate = useNavigate();
  // useEffect(() => {
  //   // Perform the navigation when the component mounts
  //   navigate('/payment', { state: { values } });
  // }, [navigate, values]);
  const paynow = (details) => {
    console.log("**", details)
      console.log("paynow aya")
        values.service_used = details[0]
        values.delivery_date = details[1]
        values.amount = details[2]
        console.log("paynow aya", values)
        navigate('/Payment',{ state: { values } })
        console.log("paynow gaya")
      }

  return (
    <div className="container">
      <div className="row">
      <div className="col-md-4">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              
              <Card.Text>
                Service Name : Speedmail
                <br/>
                 Delivery Date: 12-04-2023
                <br/>
                 Amount to be paid : 15
              </Card.Text>
              <Button variant="primary" onClick={()=>paynow(["Speedmail","12-04-2023","15"])}>select Speedmail</Button>
            </Card.Body>
          </Card>
        </div>
        <br/>
        <br/>
        <div className="col-md-4">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              
              <Card.Text>
                Service Name : UPS
                <br/>
                 Delivery Date: 12-05-2023
                <br/>
                 Amount to be paid : 20
              </Card.Text>
              <Button variant="primary" onClick={()=>paynow(["UPS","12-05-2023","20"])}>select UPS</Button>
            </Card.Body>
          </Card>
        </div>
        <br/>
        <br/>
        <div className="col-md-4">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text>
                Service Name : DHL
                <br/>
                 Delivery Date: 12-07-2023
                <br/>
                 Amount to be paid : 18
              </Card.Text>
              <Button variant="primary" onClick={()=>paynow(["DHL","12-07-2023","18"])}>select DHL</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

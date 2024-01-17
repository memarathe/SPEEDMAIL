const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signinController, signupController } = require("./controllers/userController")
const speakeasy = require('speakeasy');


// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const auth = require("./auth");
const orders = require("./db/orderModel");
const sendEmail = require("./utils");
const { ObjectId } = require('bson');
const tok = require("./db/tokenModel");
const service = require("./db/variousServices");

const express = require('express');
const cors = require('cors');
const app = express();

dbConnect();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
  res.send("whaddup!");
});

app.post("/register", (request, response) => {
    // console.log("andar aya")
    // hash the password
    const secret = speakeasy.generateSecret({ length: 20 });
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        console.log("hashed password is: ", request.body.password)
        console.log(hashedPassword)
        // create a new user instance and collect the data
        const user = new User({
          email: request.body.email,
          password: hashedPassword,
          firstname: request.body.firstname,
          lastname: request.body.lastname,
          phone: request.body.phone,
          user_type: request.body.user_type,
          security_question: request.body.security_question,
          security_answer: request.body.security_answer,
          secret: secret.base32
        });
        console.log("after user def aya")
        // save the new user
  
  
        // })
        user
          .save()
          // return success if the new user is added to the database successfully
          .then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              secret: secret.otpauth_url,
              result,
            });
          })
          // catch erroe if the new user wasn't added successfully to the database
          .catch((error) => {
            response.status(500).send({
              message: error.message,
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        console.log(e.message)
        response.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
    console.log("works?")
  });
  
  // login endpoint
  app.post("/login", (request, response) => {
    console.log(request.body, request.body.token)
    // check if email exists
    User.findOne({ email: request.body.email })
  
      // if email exists
      .then((user) => {
        // compare the password entered and the hashed password found
        bcrypt
          .compare(request.body.password, user.password)
  
          // if the passwords match
          .then((passwordCheck) => {
  
            // check if password matches
            if (!passwordCheck) {
              console.log("here??")
              return response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }
  
            // const isVerified = speakeasy.totp.verify({
            //   secret: user.secret,
            //   encoding: 'base32',
            //   token: request.body.token,
            // });
            const isVerified = true
  
            console.log(isVerified)
  
            if (isVerified) {
  
              //   create JWT token
              const token = jwt.sign(
                {
                  userId: user._id,
                  userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
              );
  
              //   return success response
              response.status(200).send({
                message: "Login Successful",
                email: user.email,
                id: user._id,
                role: user.user_type,
                token,
              });
            }
            else {
              response.json({ success: false, error: 'Invalid 2FA token' });
            }
          })
          // catch error if password do not match
          .catch((error) => {
            console.log(error.message, "\n")
            console.log("aaaaaaaaaa")
            response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        response.status(404).send({
          message: "Email not found",
          e,
        });
      });
  });
  
  app.post("/login_google", (request, response) => {
    console.log("request: ", request.body.userEmail)
    // check if email exists
    User.findOne({ email: request.body.userEmail })
      .then((user) => {
        // create JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );
  
        // return success response
        response.status(200).send({
          message: "Login Successful",
          email: user.email,
          id: user._id,
          role: user.user_type,
          token,
        });
  
      })
      // catch error if email does not exist
      .catch((e) => {
        response.status(404).send({
          message: "Email not found",
          e,
        });
      });
  });
  
  
  app.post("/order", (request, response) => {
    console.log("andar aya")
    // create a new order instance and collect the data
    const Order = new orders({
      sender_name: request.body.sender_name,
      receiver_name: request.body.receiver_name,
      length_of_pkg: request.body.length_of_pkg,
      width_of_pkg: request.body.width_of_pkg,
      sender_phone: request.body.sender_phone,
      receiver_phone: request.body.receiver_phone,
      sender_adr: request.body.sender_adr,
      receiver_adr: request.body.receiver_adr,
      service_used: request.body.service_used,
      delivery_date: request.body.delivery_date,
      amount: request.body.amount,
      driver_id: request.body.driver_id,
      order_status: request.body.order_status,
      sender_email: request.body.sender_email,
    });
    Order
      .save()
      // return success if the new user is added to the database successfully
      .then((result) => {
        response.status(201).send({
          message: "Order placed Successfully",
          result,
        });
      })
      // catch erroe if the new order wasn't added successfully to the database
      .catch((error) => {
        response.status(500).send({
          message: "Error placing order",
          error,
        });
      });
  });
  
  // app.get("/fetch", async (request, response) => {
  //   const orders = await orders.find({_id:new ObjectId(request.body.id)})
  //   console.log(orders)
  // });
  
  // free endpoint
  app.post("/service", (request, response) => {
    // create a new order instance and collect the data
    const Service = new service({
      service_name: request.body.service_name,
  
    });
    Service
      .save()
      // return success if the new user is added to the database successfully
      .then((result) => {
        response.status(201).send({
          message: "Service added Successfully",
          result,
        });
      })
      // catch erroe if the new order wasn't added successfully to the database
      .catch((error) => {
        response.status(500).send({
          message: "Error adding service",
          error,
        });
      });
  });
  app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
  });
  
  // authentication endpoint
  app.get("/auth-endpoint/", auth, (request, response) => {
    // console.log(request)
    response.send({ message: "You are authorized to access me" });
  });
  
  app.post("/random-shit", (request, response) => {
    User.findOne({ _id: new ObjectId(request.body.id) })
      .then((user) => {
        console.log(user)
      })
  })
  
  app.post("/generate_otp", async (req, res) => {
    const newItem = new tok(req.body)
  })
  
  
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  app.get('/orderss/:email', async (req, res) => {
    try {
      const values = await orders.find({ sender_email: req.params.email })
      console.log("called?")
      return res.json(values)
    } catch (error) {
      return res.status(500).json({ message: "internal server error" })
    }
  })
  
  app.get('/orders', async (req, res) => {
    try {
      const values = await orders.find({ driver_id: "NA" })
      return res.json(values)
  
    } catch (error) {
      return res.status(500).json({ message: "internal server error" })
    }
  })
  
  app.get('/order_details/:id', async (req, res) => {
    try {
      console.log("idhar aya kya??")
      // Fetch all values from your MongoDB collection
      const values = await orders.findById(req.params.id);
      if (!values) {
        return res.status(404).json({ message: "order not found" })
      }
      res.json(values);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.put('/update_order', async (req, res) => {
    const driver_id = req.query.driver_id;
    const order_id = req.query.order_id;
    const order_status = req.query.order_status
  
    try {
      const updatedDocument = await orders.findByIdAndUpdate(
        order_id,
        { order_status: order_status },
        { new: true }
      )
  
      if (order_status == "delivered") {
        await sendEmail(updatedDocument.sender_email, "Update of order", "Your order has been delivered successfully!")
      }
  
      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.json(updatedDocument);
    } catch (error) {
      console.error('Error updating document:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  
    // Your code to handle the parameters
  });
  
  
  // Express route handling the API call
  app.put('/assign', async (req, res) => {
    const driver_id = req.query.driver_id;
    const order_id = req.query.order_id;
  
    try {
      const updatedDocument = await orders.findByIdAndUpdate(
        order_id,
        { driver_id: driver_id },
        { new: true }
      )
  
      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.json(updatedDocument);
    } catch (error) {
      console.error('Error updating document:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
    // Your code to handle the parameters
  });
  
  
  app.get('/services_details', async (req, res) => {
    try {
      // Fetch all values from your MongoDB collection
      const values = await service.find();
      res.json(values);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.post('/check_email', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/verify_security_answer', async (req, res) => {
    const { email, securityAnswer } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user && user.security_answer === securityAnswer) {
        res.json({ correct: true });
      } else {
        res.json({ correct: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/driver_list', async (req, res) => {
    try {
      const values = await User.find({ user_type: "I AM A DRIVER" })
      res.json(values);
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  })
  
  app.get('/order_list', async (req, res) => {
    try {
      const values = await User.find()
      res.json(values);
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  })
  
  app.delete('/delete_service/:id', async (req, res) => {
    try {
      const deletedItem = await service.findByIdAndDelete(req.params.id);
      res.json(deletedItem);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.post("/forgot_password", async (req, response) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let otp = generateOTP()
      const newItem = new tok({ email: user.email, token: otp })
      newItem
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Order placed Successfully",
            result,
          });
        })
        // catch erroe if the new order wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "error.message",
            error,
          });
        });
      await sendEmail(user.email, "OTP", otp)
    } else {
      console.log("fu!!")
    }
  })
  
  app.post("/update_customer", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      await sendEmail(user.email, "Status Update", "Your Order has been successfully delivered!")
    }
  })
  
  app.post("/verify_otp", async (req, res) => {
    try {
      console.log(req.body)
      const toke = await tok.findOne({ email: req.body.email })
      console.log(req.body.token, toke.token)
      if (toke) {
        if (toke.token == req.body.token) {
          return res.status(200).send({ message: "otp verified successfully!", valid: true })
        } else {
          return res.status(500).send({ message: "OTP does not match" })
        }
      } else {
        return res.status(401).send({ message: "Token expired or invalid" })
      }
    } catch (error) {
      console.log(error.message)
    }
    // console.log("aya")
    // return res.status(200).send({message: "otp verified"})
  })
  
  app.post("/users/signin", signinController)
  
  app.post('/update_password', async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await User.findOneAndUpdate({ email }, { password: hashedPassword });
      // await User.findOneAndUpdate({ email }, { password: bcrypt.hash(newPassword, 10) });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.put('/password/:id', async (req, res) => {
    try {
      const updatedItem = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      } else {
        console.log("item found")
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  /*
  app.get("/getAddress", async (request, response) => {
    //Look up tutorial on how to update the card once a button is clicked
    //Get destination address & order id, from the order table and from the driver table we need driver id
      
      //find the sender address from the orders table
      const sender = await orders.findOne({ sender_adr: request.body.sender_adr });
      //find the receiver address from the orders table
      const receiver = await orders.findOne({ receiver_adr: request.body.receiver_adr });
      //find the order id from the orders table
      const orderID = await orders.findOne({ _id: request.body._id });
      //find the driver id from the order Schema
      const driverID = await orders.findOne({ driver_id: request.body.driver_id });
      //find the order status from the order Schema
      const orderStatus = await orders.findOne({ order_status: request.body.order_status });
    
      console.log("Hey this is the api");
  
    try {
      response.status(200).get({
        message: "Address found",
        sender,
        receiver,
        orderID,
        driverID, 
        orderStatus
      });
    }
    catch (e) {
      response.status(404).get({
        message: "Address not found",
        e,
      });
    }
    });
  */
  
  app.get("/getAddress", async (request, response) => {
    const driver_id = request.query.driver_id
  
    try {
      console.log("Hey this is the api");
      //trying to get the details form the orders collection
      const orderDetails = await orders.findOne({ driver_id: driver_id })
        .sort({ _id: -1 }) // Sort by the "_id" field in descending order
        .limit(1);
      console.log(orderDetails)
      // const orderDetails = await orders.findOne({
      //   sender_adr: request.body.sender_adr,
      //   receiver_adr: request.body.receiver_adr,
      //   _id: request.body._id,
      //   driver_id: request.body.driver_id,
      //   order_status: request.body.order_status,
      // });
  
  
      if (orderDetails) {
        console.log("Hey, this is the API");
        response.status(200).json({
          message: "Address found",
          orderDetails,
        });
      } else {
        response.status(404).json({
          message: "Addrelatestss not found",
        });
      }
    } catch (e) {
      console.error("Error in getAddress API:", e);
      response.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  
//   app.get("/getAddress", async (request, response) => {
//     //Look up tutorial on how to update the card once a button is clicked
//     //Get destination address & order id, from the order table and from the driver table we need driver id
  
//     //find the sender address from the orders table
//     const sender = await orders.findOne({ sender_adr: request.body.sender_adr });
//     //find the receiver address from the orders table
//     const receiver = await orders.findOne({ receiver_adr: request.body.receiver_adr });
//     //find the order id from the orders table
//     const orderID = await orders.findOne({ _id: request.body._id });
//     //find the driver id from the order Schema
//     const driverID = await orders.findOne({ driver_id: request.body.driver_id });
//     //find the order status from the order Schema
//     const orderStatus = await orders.findOne({ order_status: request.body.order_status });
  
//     try {
//       response.status(200).get({
//         message: "Address found",
//         sender,
//         receiver,
//         orderID,
//         driverID,
//         orderStatus
//       });
//     }
//     catch (e) {
//       response.status(404).get({
//         message: "Address not found",
//         e,
//       });
//     }
//   });
  //update order_status
  app.post("/update_order_status", async (request, response) => {
  
  
  });
  app.get('/getDriverData/:id', async (req, res) => {
    try {
      const result = await User.findById(req.params.id);
      console.log("result print", result);
      if (result) {
        res.json(result);
        console.log(result);
      }
      else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/getCustomerData/:sender_name', async (req, res) => {
    try {
      const result = await orders.find({ sender_name: req.params.sender_name });
      console.log("result print", result);
      if (result) {
        res.json(result);
        console.log(result);
      }
      else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = app;

import './App.css';
import { lazy, Suspense, startTransition } from 'react';
import routes from "./config.ts";
import Home from './pages/Home.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';
import Register from './components/Register/index.js'
import Login from './components/Login/index.js'
import AuthComponent from './AuthComponent';
import ProtectedRoutes from './ProtectedRoutes';
import { Styles } from './styles/styles.ts';
import Manager from './pages/Manager';
import Shippackagemaps from './pages/Ship_package_maps.js';
import Shippackagedetails from './pages/Ship_package.js';
import Chat from './pages/Chat';
import Tracking from './pages/Tracking.tsx';
import Search from './pages/Search.tsx';
import PastOrders from './pages/PastOrders.tsx';

// import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react'
import Recommend from './pages/recommend_service.js'
import ForgotPassword from './pages/ForgotPassword.tsx';
import Makepayment from './pages/payment.js'
import Track_and_review from './pages/Track_and_review.tsx';
import AddService from './pages/add-courier-service.js'
import Services from './pages/Services.tsx';
import AssignDriver from './pages/AssignDriver.tsx';
import AssignDriverOrder from './pages/AssignDriverOrder.tsx';
import DisplayDriverDetails from './pages/DisplayDriverDetails.js'
import DisplayCustomerDetails from './pages/DisplayCustomerDetails';
import DriverPage from './pages/DriverPage';


function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Styles />
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tracking' element={<Tracking/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user/:param' element={<AuthComponent/>}/>
        <Route path='/manager' element={<Manager/>}/>
        <Route path='/past_orders/:id' element={<PastOrders/>}/>

        <Route path='/ship_package' element={<Shippackagedetails/>}/>
        {/* <ChakraProvider theme={theme}> */}
        <Route path='/Ship_package_maps' element={<Shippackagemaps/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/recommend_service' element={<Recommend/>}/>
        <Route path='/forgot_password' element={<ForgotPassword/>}/>
        {/* <Route path='/payment' element={<Makepayment/>}/> */}
        <Route path='/track_and_review' element={<Track_and_review/>}/>
        <Route path='/add-courier-service' element={<AddService/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/Payment' element={<Makepayment/>}/>
        <Route path='/assign_driver' element={<AssignDriver/>}/>
        <Route path='/assign_driver/:driver_id' element={<AssignDriverOrder/>}/>
        <Route path='/displaydriverdetails' element={<DisplayDriverDetails/>}/>
        <Route path='/displaycustomerdetails' element={<DisplayCustomerDetails/>}/>
        <Route path='/DriverPage' element={<DriverPage/>}/>
        {/* {routes.map((routeItem) => {
          console.log(routeItem.component)
            return (
              <Route
                key={routeItem.component}
                exact={routeItem.exact}
                path={routeItem.path}
                element={lazy(() => import('./pages/Home.tsx'))}
              />
            );
          })} */}
      </Routes>
      <Footer />
      </Suspense>
    </BrowserRouter>
    
  );
}

export default App;

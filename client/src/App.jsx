// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import CustomerHome from './customer/CustomerHome'
import ServicesPage from './customer/ServicesPage'
import AboutUsPage from './customer/AboutUsPage'
import OrderDetails from './customer/OrderDetails'

import TailorDashboard from './tailor/TailorDashboard'
import TailorProfile from './tailor/TailorProfile'
import OrdersPage from './tailor/OrderPage'
import AppointmentsPage from './tailor/AppointmentsPage'
import TailorMessengerPage from './tailor/TailorMessengerPage'
import TailorEarnings from './tailor/TailorEarnings'
import ViewProfile from './tailor/ViewProfile'
import EditProfile from './tailor/EditProfile'
import TailorList from './components/TailorList'
import TailorProfileView from './customer/TailorProfileView'
import EditCustomerProfile from './customer/EditCustomerProfile'
import CustomerProfile from './customer/CustomerProfile'


function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/customer/home" element={<CustomerHome />} />
      <Route path="/customer/service" element={<ServicesPage />} />
      <Route path="/customer/about" element={<AboutUsPage />} />
      <Route path="/customer/orders" element={<OrderDetails />} />
      <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/customer/edit-profile" element={<EditCustomerProfile />} />


      <Route path="/tailor/home" element={<TailorDashboard />} />
      <Route path="/tailor/orders" element={<OrdersPage />} />
      <Route path="/tailor/profile" element={<TailorProfile />} />
      <Route path="/tailor/view-profile" element={<ViewProfile />} />
      <Route path="/tailor/edit-profile" element={<EditProfile />} />


      <Route path="/tailor/appointments" element={<AppointmentsPage />} />
      <Route path="/tailor/messages" element={<TailorMessengerPage />} />
      <Route path="/tailor/earnings" element={<TailorEarnings />} />

      <Route path="/tailors/:service" element={<TailorList />} />
      <Route path="/tailor-profile/:id" element={<TailorProfileView />} />

      <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App

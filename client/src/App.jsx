// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import CustomerHome from './customer/CustomerHome'
import ServicesPage from './customer/ServicesPage'
import AboutUsPage from './customer/AboutUsPage'
import Profile from './customer/Profile'
import OrderDetails from './customer/OrderDetails'
import TailorDashboard from './tailor/TailorDashboard'
import TailorProfile from './tailor/TailorProfile'
import EditProfile from './tailor/EditProfile'


function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/customer/home" element={<CustomerHome />} />
      <Route path="/customer/service" element={<ServicesPage />} />
      <Route path="/customer/about" element={<AboutUsPage />} />
      <Route path="/customer/profile" element={<Profile />} />
      <Route path="/customer/orders" element={<OrderDetails />} />


      <Route path="/tailor/home" element={<TailorDashboard />} />
      <Route path="/tailor/profile" element={<TailorProfile />} />
      <Route path="/tailor/edit-profile" element={<EditProfile />} />
      </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import TailorHome from './tailor/TailorHome'
import CustomerHome from './customer/CustomerHome'
import ServicesPage from './customer/ServicesPage'
import AboutUsPage from './customer/AboutUsPage'


function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/customer/home" element={<CustomerHome />} />
      <Route path="/customer/service" element={<ServicesPage />} />
      <Route path="/customer/about" element={<AboutUsPage />} />
      <Route path="/tailor/home" element={<TailorHome />} />
      </Routes>
    </>
  )
}

export default App

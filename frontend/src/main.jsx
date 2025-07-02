import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import ServicesOverview from './components/servicesOverview/ServicesOverview.jsx'
import AboutUs from './components/aboutUs/AboutUs.jsx'
import PatientPortal from './components/patient_portal/PatientPortal.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)

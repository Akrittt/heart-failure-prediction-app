import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Header from './components/header/header';
import Menu from './components/menu/Menu';
import Home from './components/home/Home';
import AboutUs from './components/aboutUs/AboutUs';
import ServicesOverview from './components/servicesOverview/ServicesOverview';
import PatientPortal from './components/patient_portal/PatientPortal';
import Blog from './components/blogs/Blog';
import Feedback from './components/feedback/Feedback';
import Footer from './components/footer/Footer';

function App() {
  
  return (
    <>
      <div className='bg-gradient-to-b bg-sky-100 via-white to-sky-100 '>

        {/* header */}
        <Header/>
        <Menu/>

        {/*Home*/}
        <Home/>

        {/*About Us */}
        <AboutUs/>

         {/*Service Overview */}
         <ServicesOverview/>

         {/*Patient Portal */}
         <PatientPortal/>

         {/*Blog*/}
         <Blog/>

         <Feedback/>

         <Footer/>



      </div>
    </>
  );
}

export default App;

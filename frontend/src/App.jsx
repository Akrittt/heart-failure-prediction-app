import React, { useEffect, useState } from 'react';
// import Header from './components/header/header';
import ContactUs from './components/contactUs/ContactUs.jsx';
import Home from './components/home/Home.jsx';
import AboutUs from './components/aboutUs/AboutUs.jsx';
import ServicesOverview from './components/servicesOverview/ServicesOverview';
import PatientPortal from './components/patient_portal/PatientPortal.jsx';

import Footer from './components/footer/Footer.jsx';
import HealthcareReviews from './components/feedback/HealtcareReviews.jsx';
import MenuBar from './components/menu/MenuBar.jsx';

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  
  return (
    <>
      <div className='bg-gradient-to-b bg-sky-100 via-white to-sky-100 '>

        {/* header */}
        {/* <Header isLoggedin={isLoggedin} /> */}
        <MenuBar  isLoggedin={isLoggedin}/>

        {/*Home*/}
        <Home />

        {/*About Us */}
        <AboutUs />

        {/* Service Overview
          <ServicesOverview/> */}

        {/*Patient Portal */}
        <PatientPortal />
        <ContactUs />

        {/* Healthcare Reviews */}
        <HealthcareReviews />
        {/* Footer */}
        <Footer />



      </div>
    </>
  );
}

export default App;

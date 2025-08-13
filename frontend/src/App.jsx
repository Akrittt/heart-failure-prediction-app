import React, { useEffect, useState } from 'react';
import Header from './components/header/header';

import { AuthProvider } from './components/auth/AuthContext';
import Home from './components/home/Home';
import AboutUs from './components/aboutUs/AboutUs';
import ServicesOverview from './components/servicesOverview/ServicesOverview';
import PatientPortal from './components/patient_portal/PatientPortal';

import Footer from './components/footer/Footer';
import HealthcareReviews from './components/feedback/HealtcareReviews';
import MenuBar from './components/menu/MenuBar';

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  
  return (
    <>
      <div className='bg-gradient-to-b bg-sky-100 via-white to-sky-100 '>

        {/* header */}
        <Header isLoggedin={isLoggedin} />
        <MenuBar />

        {/*Home*/}
        <Home />

        {/*About Us */}
        <AboutUs />

        {/* Service Overview
          <ServicesOverview/> */}

        {/*Patient Portal */}
        <PatientPortal />

        {/* Healthcare Reviews */}
        {/* <HealthcareReviews /> */}

        {/* Footer */}
        <Footer />



      </div>
    </>
  );
}

export default App;

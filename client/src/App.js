// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Nav from "./Nav";
import Footer from "./Footer";
import AboutUs from "./components/AboutUs";
import SignUp from "./components/SignUp";
import "aos/dist/aos.css";
import AOS from "aos";
import Login from "./components/Login";
import Gemstones from "./components/Gemstones";
import Kundali from "./components/Kundali";
import ReadMore from "./components/ReadMore";

import Yantra from "./components/Yantra";
import Success from "./pages/Success";
import PrivateRoutes from "./components/privateRoutes";
import Profile from "./pages/Profile";
import Oderse from "./pages/Oderse";
import Cart from "./pages/Cart";
import Practiescart from "./pages/Practiescart";

import Mantra from "./pages/Mantra";
import Loading from "./components/Loading";
import styled from "@emotion/styled";

import Policy from "./pages/Policy";
import Terms from "./pages/Terms";
import WorkShip from "./components/WorkShip";
import Aryuvedic from "./components/Aryuvedic";



AOS.init({
  duration: 1200,
});

const App = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  return (
    <StyledApp>
    
      {loader ? (
        <Loading />
      ) : (
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="gemstones" element={<Gemstones />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          
            <Route
              path="kundali"
              element={<PrivateRoutes><Kundali /></PrivateRoutes>}
            />
            <Route path="readmore" element={<ReadMore />} />
            <Route path="workshipitems" element={<WorkShip />} />
            <Route path="yantra" element={<Yantra />} />
            <Route path="/aryuvedicMedicine" element={<Aryuvedic />} />
            <Route path="success" element={<Success />} />
            <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
            <Route path="/orders" element={<PrivateRoutes><Oderse /></PrivateRoutes>} />
            <Route path="/newcart" element={<Cart />} />
            <Route path="/pra" element={<Practiescart />} />
            <Route path="/success" element={<PrivateRoutes><Success /></PrivateRoutes>} />
            <Route path="/mantra" element={<Mantra />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/terms&conditions" element={<Terms />} />
          
          
          </Routes>
          <Footer />
        </Router>
      )}
      {/* </div> */}
    </StyledApp>
  );
};

const StyledApp = styled.div`
  .main {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .loading {
    opacity: 0;
  }
`;

export default App;

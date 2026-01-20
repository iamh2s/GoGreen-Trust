import Content1 from './Content1';
import './Navbar1.css';
import Navbar2 from './Navbar2';
import DonateForm from './DonateForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About';
import Works from './Works';
import Conatct from './Conatct';
import Trustee from './Trustee';
import Administor from './Administor';
import Admmain from './Admmain';
import Bank from './Bank';
import Ourworks from './Ourworks'
import React, { useState, useEffect } from 'react';

function App() {
  // ✅ Central login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check sessionStorage on mount
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar2 />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Content1 />} />
          <Route path='/donate' element={<DonateForm />} />
          <Route path='/aboutus' element={<About />} />
          <Route path='/contact' element={<Conatct />} />
          <Route path='/trustee' element={<Trustee />} />

          {/* ✅ Pass setIsLoggedIn to Administor */}
          <Route path='/adm' element={<Administor setIsLoggedIn={setIsLoggedIn} />} />

          {/* ✅ Protect /admins route */}
          <Route
            path='/admins'
            element={
              isLoggedIn ? (
                <Admmain setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Administor setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />

          <Route path='/bank' element={<Bank />} />
          <Route path='/Works' element={<Works />} />
          <Route path='/Ourworks' element={<Ourworks/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

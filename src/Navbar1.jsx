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
import React, { useState, useEffect } from 'react';
import VoiceAI from './Voiceai';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar2 />
      <VoiceAI />

      <Routes>
        <Route path='/' element={<Content1 />} />
        <Route path='/donate' element={<DonateForm />} />
        <Route path='/aboutus' element={<About />} />
        <Route path='/contact' element={<Conatct />} />
        <Route path='/trustee' element={<Trustee />} />
        <Route path='/adm' element={<Administor setIsLoggedIn={setIsLoggedIn} />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

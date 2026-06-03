import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar2.css';

const Navbar2 = () => {
  const [navbarColor, setNavbarColor] = useState('linear-gradient(green,white)');
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    
    // Change navbar style when scrolled
    if (scrollPosition > 100) {
      setNavbarColor('transparent');
      setScrolled(true);
    } else {
      setNavbarColor('linear-gradient(green,white)');
      setScrolled(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
   function startVoiceAI() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
  
    recognition.start();
  
    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript;
      console.log("User said:", userText);
  
      const res = await fetch("http://127.0.0.1:8000/api/voice/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText }),
      });
  
      const data = await res.json();
      speak(data.reply);
    };
  }
  
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    speechSynthesis.speak(utterance);
  }

  return (
    <>
    <div 
      className={`nav2 ${scrolled ? 'scrolled' : ''}`} 
      style={{ background: navbarColor }}
    >
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/" className='p-2 text-dark fs-2 go'>
            GOGREEN TRUST
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link className='text-dark a' href='/' style={{ fontWeight: '700' }}>
                HOME
              </Nav.Link>
              <Nav.Link className='text-dark a' href='/aboutus' style={{ fontWeight: '700' }}>
                ABOUT US
              </Nav.Link>
              {/* <Nav.Link className='text-dark a' href='/Ourworks' style={{ fontWeight: '700' }}>
                OUR WORKS
              </Nav.Link> */}
              <Nav.Link href="/contact" className='text-dark a' style={{ fontWeight: '700' }}>
                CONTACT US
              </Nav.Link>
              <Nav.Link href="/trustee" className='text-dark a' style={{ fontWeight: '700' }}>
                TRUSTEE
              </Nav.Link>
              <a href='/adm'>
                <button className='adlo'>ADMINISTRATOR LOGIN</button>
              </a>
              
        </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
     
    
    </>
  );
};

export default Navbar2;
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar2.css'
import { Link } from 'react-router-dom'
import  { useState, useEffect } from 'react';

const Navbar2 = () => {
  const [navbarColor, setNavbarColor] = useState();


  const handleScroll = () => {
      const a = window.scrollY;
      if (a > 100) {
          setNavbarColor('transparent'); 
      }
      else {
          setNavbarColor('linear-gradient(green,white)');
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <div className='container-fluid nav2'  style={{background:navbarColor}}>
      <div className="row">
        <div className="col-md-12">
        <Navbar expand="lg" className="">
      <Container>
        <Navbar.Brand href="#home" className='p-2 text-dark fs-2 go'>GOGREEN TRUST</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto w-100 d-flex justify-content-center align-items-center" style={{width:'70'}}>
                   <Nav.Link className='ms-5 text-dark a' href='/' style={{fontWeight:'700'}}>HOME</Nav.Link>
                <Nav.Link className='ms-5 text-dark a' href='/aboutus' style={{fontWeight:'700'}}>ABOUT US</Nav.Link>
              <NavDropdown title="OUR AREA OF FOCUS" id="basic-nav-dropdown"  style={{fontWeight:'700'}} className='ms-3 a'>
                             
              <NavDropdown.Item href="#ps" className='b' style={{fontWeight:'500'}}>Providing Shelters</NavDropdown.Item>
              <NavDropdown.Item href="#pf" className='b'  style={{fontWeight:'500'}}>Providing Food </NavDropdown.Item>
              

              </NavDropdown>
          
              <Nav.Link href="/contact" className='ms-3 text-dark a'  style={{fontWeight:'700'}}>CONTACT US</Nav.Link>
            
              <Nav.Link href="/trustee" className='ms-3 text-dark a'  style={{fontWeight:'700'}}>TRUSTEE</Nav.Link>
       <a href='/adm'>           
           <button className='adlo' > ADMINISTRATOR LOGIN</button>
           </a>

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
      </div>
      
    </div>
  )}


export default Navbar2
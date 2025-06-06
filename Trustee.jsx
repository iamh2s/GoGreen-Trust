import React, {useEffect, useState } from 'react'
import './Trustee.css'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Footer from './Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';
const Trustee = () => {
   useEffect(() => {
      AOS.init({
        offset: 120,      
        duration: 1000,    
        easing: 'ease',   
        delay: 0,        
        once: false,       
         disable: window.innerWidth < 768
      });
    }, []);
  const [trustees,settrustee] =useState( [
    {
      name: "John Doe",
      position: "Chairman",
      description: "Dedicated to animal welfare with over 15 years of experience.",
      image: "ttt1.jpg"
    },
    {
      name: "Jane Smith",
      position: "Vice Chairman",
      description: "Passionate about creating sustainable animal shelters.",
      image: "tt2.webp"
    },
    {
      name: "Mike Johnson",
      position: "Secretary",
      description: "Veterinarian with expertise in animal care and management.",
      image: "tt3.webp"
    }
 ] )
  return (
    <>
    <div className="trusteeee" style={{ background:'linear-gradient(white,yellowgreen,green)'}}>
    <Container className="py-5" data-aos='zoom-in'>
      <h2 className="text-center mb-5" style={{color: 'darkgreen'}}>Our Trustees</h2>
      <Row className="g-4">
        {trustees.map((trustee, index) => (
          <Col key={index} md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={trustee.image} alt={trustee.name} />
              <Card.Body className="text-center">
                <Card.Title>{trustee.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{trustee.position}</Card.Subtitle>
                <Card.Text>{trustee.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
         
        ))}
        
      </Row>
    </Container>
    <Footer/>
     </div>
    </>
  )
}
export default Trustee
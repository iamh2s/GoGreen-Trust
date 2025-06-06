
import React, { useEffect } from 'react'
import './About.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Footer from './Footer'
import './Work.css';
import { Link } from 'react-router-dom';
const About = () => {
  useEffect(() => {
    AOS.init({
      offset: 120,
      duration: 1000,
      easing: 'ease',
      delay: 0,
      once: false,
    })
  }, [])
  return (
    <>
    <div className="aboutus-container-fluid">
      <div className="aboutus-header pt-5">
        <h1>ABOUT US</h1>
        <div className="underline"></div>
      </div>
      <div className="col">
        <div className="row-md-6">
        <div className="aboutus-content">
        <div className="mission-section " data-aos="fade-right">
          <h2 className='text-center'> OUR MISSION</h2>
          
          <p>
            <span style={{color:'green'}}>GoGreen Trust</span> is dedicated to protecting and nurturing animals,
            particularly cows and dogs, as they are an integral part of God's
            creation. We strive to provide safe shelters, proper care, and
            sustainable support while promoting compassion and responsible pet
            ownership in our community.
          </p>
        </div>
        <div className="vision-section" data-aos="fade-up">
          <h2 className='text-center'>Our Vision</h2>
          <p>
            To become a leading animal welfare organization that sets the standard
            for animal care and protection, inspiring communities to treat all
            creatures with kindness and respect while creating a sustainable
            environment for their wellbeing.
          </p>
        </div>
        <div className="join-section" data-aos="fade-left">
          <h2>OUR EXPERIENCE</h2>
          <p>
              GO GREEN MEANS <br></br>
              ‘compassion in action’  <br></br><br></br>

              45 years of experience on,we are still inspired by our Buddhist origins, our supporters, employees and volunteers come from many different backgrounds and beliefs. Instead of ideas, what connects us all is a set of universal and shared values, such as compassion and integrity, as well as a commitment to serve those who need it most.
          </p>
       </div>
        </div>
        <div className="row-md-6 mt-5">
        <div className="impact-section" data-aos="fade-right">
          <h2 className='text-center'>Our Impact</h2>
          <ul>
            <li>Rescued and rehabilitated over 1000+ animals</li>
            <li>Provided shelter to 500+ cows and dogs</li>
            <li>Conducted 100+ awareness programs</li>
            <li>Partnered with 50+ local communities</li>
            <li>Created sustainable animal care practices</li>
          </ul>
        </div>
      
        <div className="values-section mt-5" data-aos="fade-left">
          <h2 className='text-center'>Our Values</h2>
          <ul>
            <li className='u'>Respect for all living beings</li>
            <li>Commitment to animal welfare</li>
            <li>Community engagement and education</li>
            <li>Transparent and ethical operations</li>
            <li>Sustainable practices and long-term impact</li>
          </ul>
        </div>
        <div className="join-section mt-5" data-aos="fade-up">
          <h2>Join Our Cause</h2>
          <p>
            Your support helps us continue our mission of protecting and caring for
            animals in need. Whether through donations, volunteering, or spreading
            awareness, every contribution makes a difference.
          </p>
          <a href="/donate" className="btn" style={{marginTop:'-10px'}}>
            <span className="btnInner">DONATE NOW!</span>
          </a>
        </div>
        </div>
      </div>
   
      </div>
    </div>
    <Footer/>
 </>
  )
}
export default About
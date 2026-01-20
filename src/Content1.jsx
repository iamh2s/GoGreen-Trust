import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './Content1.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom'
import Works from './Works';


const Content1 = () => {
 useEffect(() => {
  AOS.init({
    offset: 80,
    duration: 1000,
    easing: 'ease-out-cubic',
    delay: 50,
    once: false,         
    mirror: false,
    anchorPlacement: 'top-bottom',
    disableMutationObserver: true, 
  });
   setTimeout(() => {
    AOS.refreshHard();
  }, 500);
}, []);
  return (
    <>
    <div className='ca'>
    <Carousel data-bs-theme="light" className='carousel-fade' interval={4000}  ride="carousel"
  pause={false}>
        <Carousel.Item>
            <img
                className="d-block w-100 ken"
                src="/pexels-gabrielacheloni-2191432.jpg"
                alt="First slide"
            />
            <Carousel.Caption>
                <div className='caption'>
                    <Link to="/donate">
                        <a className="btn" data-aos="fade-up">
                            <span className='btnInner'>DONATE NOW!</span>
                        </a>
                    </Link>
                </div>
                <p className='mt-1' data-aos="fade-up">“Always give without remembering and always receive <br /> without forgetting".</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 ken"
                src="/pexels-jakub-tabisz-3738037-5599041.jpg"
                alt="Second slide"
            />
            <Carousel.Caption>
               <div className='caption'> 
                <Link to="/donate">
                    <a className="btn">
                        <span className='btnInner'data-aos="fade-up">DONATE NOW!</span>
                    </a>
                </Link>
              </div>
                <p className='mt-1' data-aos="fade-up">“Happiness doesn’t result from what we get, but from <br /> what we give.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 ken"
                src="/pexels-julia-volk-5652548.jpg"
                alt="Third slide"
            />
            <Carousel.Caption>
                <div className='caption'>
                <Link to="/donate">
                    <a className="btn" href="" target="_blank">
                        <span className='btnInner' data-aos="fade-up">DONATE NOW!</span>
                    </a>
                </Link>
                </div>
                <p className='mt-1' data-aos="fade-up">
                    We make a living by what we get. We make a life by <br /> what we give.
                </p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
</div>
<div className="row">
    <div className="col-md-12">
        <div className="t text-center">
            <p className='x'data-aos='zoom-in-left'>*</p>
            <p className='tru'data-aos='zoom-in-right'>Triumph over prejudice and ignorance is a triumph for us all.</p>
            <p className='ka text-center'data-aos='zoom-in-left'>GoGreen\GOG.Com</p>
            <p className='sl text-center'data-aos='zoom-in-right'> ||</p>
            <p className='ka text-center'data-aos='zoom-in-left'>
                GoGreen, a charity inspired by Buddhist values, works alongside the most excluded people in South Asia,<br />
                overcoming poverty and discrimination with locally-led projects <br />
                <span className='text-danger'data-aos='zoom-in-right'>focusing on animal prevention, like dogs and cows.</span>
            </p>
            <a href='/aboutus'>
                <p className='text-center text-decoration-none learn' data-aos="zoom-in-left"> Learn More</p>
            </a>
        </div>
        <div className="sponcers" data-aos="zoom-in-up">
            <h3 className="don text-center" style={{ fontWeight: "400", fontSize: '40px',marginTop:'-0px' }}>OUR RESPECTFUL DONERS</h3>
        </div>
        <div className="line" data-aos="zoom-out-right"></div>
        <div className="img mt-5">
            <marquee className='mt-4' data-aos="fade-in" loop="infinite">
                <a href='#doners'>
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                    <img src="client-1.png" height='100px' width='180px' className='c1' alt="" />
                    <img src="client-2.png" height='80px' width='180px' className='c2' alt="" />
                    <img src="client-3.png" height='80px' width='180px' className='c3' alt="" />
                    <img src="client-4.png" height='80px' width='180px' className='c4' alt="" />
                    <img src="client-5.png" height='80px' width='180px' className='c5' alt="" />
                    <img src="client-6.png" height='80px' width='180px' className='c6' alt="" />
                    <img src="client-7.png" height='80px' width='180px' className='c7' alt="" />
                    <img src="client-8.png" height='80px' width='180px' className='c8' alt="" />
                   </a>
            </marquee>
            <div id="oaof"></div>
        </div>
    </div>
</div>
<Works/>
    
        
            


       
       </>
    )}

export default Content1
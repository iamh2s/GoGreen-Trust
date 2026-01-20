import React from 'react';
import { FaAppleAlt } from "react-icons/fa";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './Work.css';

const Works = () => {
  return (
    <div>
      <div className="container-fluid px-3 px-md-4">
        
        {/* Header Section */}
        <div className="row">
          <div className="col-12">
            <h3 className="sponcers text-center mt-5 mb-3" data-aos="zoom-in-up">
              OUR AREA OF FOCUS
            </h3>
            <div className="line mx-auto" data-aos="zoom-out-right"></div>
          </div>
        </div>

        {/* Decorative Dots */}
        <div className="row">
          <div className="col-12">
            <p className='ak text-center' data-aos="zoom-out-right">.</p>
            <p className='ak1 text-center' data-aos="zoom-out-left">.</p>
            <p className='ak1 text-center' data-aos="zoom-out-right">.</p>
            <p className='ak1 text-center' data-aos="zoom-out-left">.</p>
            <p className='ak1 text-center' data-aos="zoom-out-right">.</p>
            <p className='ak1 text-center' data-aos="zoom-out-left">.</p>
          </div>
        </div>

        {/* PROVIDING SHELTERS Section */}
        <div className="row mb-3 g-4">
          <div className="col-12">
            <p className='fs-2 fs-md-1 text-center mb-3' data-aos="zoom-in-up" style={{color:'darkgreen'}}>
              <span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  fill="currentColor" 
                  className="bi bi-house-heart-fill d-inline-block mb-2" 
                  viewBox="0 0 16 16"
                >
                  <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"/>
                  <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"/>
                </svg>
              </span>
              <span className="ms-2">PROVIDING SHELTERS</span>
            </p>
            <div className="text-center">
              <img 
                src="/retro-floral-decorative-graphic-element.png" 
                data-aos="zoom-in-up" 
                className="img-fluid"
                style={{maxWidth:'300px', height:'auto'}}
                alt="decorative element"
              />
            </div>
          </div>

          <div className="col-12 col-lg-6 order-2 order-lg-1" data-aos="zoom-out-right">
            <div className="p-3 p-md-4">
              <p className="lead">
                Historically, many communities have collaborated with <span style={{color:'green', fontWeight:'600'}}>GOGREEN</span> to provide shelters for cows and dogs. We also buy cows from farmers and owners at a fair price and offer them a safe home with proper food and care. Owners are welcome to visit our facility and spend time with their cows.
              </p>
              <p className="lead">
                Additionally, we provide shelter for dogs, adopting them from owners who can no longer care for them. The primary mission of <span style={{color:'green', fontWeight:'600'}}>GOGREEN</span> is to protect and nurture these animals, as they are part of God's creation. We have become a role model for many individuals who share our passion for animal welfare.
              </p>
            </div>
            
            <div className="text-center mt-4">
              <img 
                src="/cows-grazing-nature.jpg" 
                data-aos="zoom-out-right" 
                className="img-fluid rounded shadow"
                style={{maxWidth:'600px'}}
                alt="Cows grazing in nature"
              />
            </div>
          </div>

          <div className="col-12 col-lg-6 order-1 order-lg-2" data-aos="zoom-out-left">
            <div className="text-center">
              <img 
                src="/Adobe Express - file.png" 
                className="img-fluid"
                style={{maxWidth:'500px'}}
                alt="Statistics graphic"
              />
              <p className='display-1 fw-light mt-3' data-aos="zoom-out" style={{color:'darkgreen'}}>96%</p>
              <p className='lead px-3 px-md-5' data-aos="zoom-out">
                96% of our sheltering spaces are nearly full, and we are actively searching for new locations. Therefore, we kindly request your support in raising funds.
              </p>
            </div>
            <p className='text-center display-3 fw-light' data-aos="zoom-in-left" style={{fontFamily:'Times New Roman, Times, serif'}}>|</p>
          </div>
        </div>

        {/* PROVIDING FOOD Section */}
        <div className="row mt-5 mb-5 g-4">
          <div className="col-12">
            <p className='fs-2 fs-md-1 text-center mb-3' data-aos="zoom-in-up" style={{color:'darkgreen'}}>
              <FaAppleAlt className='d-inline-block mb-2' style={{fontSize:'32px'}} /> 
              <span className="ms-2">PROVIDING FOOD</span>
            </p>
            <div className="text-center">
              <img 
                src="/retro-floral-decorative-graphic-element.png" 
                data-aos="zoom-in-up" 
                className="img-fluid"
                style={{maxWidth:'300px', height:'auto'}}
                alt="decorative element"
              />
            </div>
          </div>

          <div className="col-12 col-lg-6 order-1 order-lg-1 pff" data-aos="zoom-in-left">
            <div className="text-center">
              <img 
                src='cow2.png'
                className='img-fluid cow'
                style={{maxWidth:'500px', marginTop:'-150px'}}
                alt="Cow illustration"
              />
            </div>
          </div>

          <div className="col-12 col-lg-6 order-1 order-lg-2" data-aos="zoom-in-right" style={{marginTop:'-60px'}}>
            <div className="p-3 p-md-4 mt-lg-5">
              <p className="lead">
                <span style={{ color: 'green', fontWeight:'600' }}>GOGREEN</span> also supports animals like dogs and cows by providing them with food and water in our shelters. Our plan is to help these creatures consistently and compassionately from generation to generation.
              </p>
              <p className="lead">
                We encourage volunteers and animal lovers to visit, interact with, and support our mission. We conduct educational programs to promote kindness toward animals and responsible pet ownership.
              </p>
            </div>
            
            <div className='text-center mt-4 p-3' data-aos="zoom-in-up">
              <p className="lead">
                We encourage volunteers, animal lovers, and supporters to visit our shelters, interact with the animals, and contribute to our mission.
              </p>
              <a className='text-decoration-none' href='/donate'>
                <button className='bbb mt-2'>SUPPORT US</button>
              </a>
            </div>
          </div>
        </div>

      

        {/* Call to Action Section */}
        <div className="row">
          <div className="col-12">
            <div className="last py-5 px-3 rounded">
              <p className='bhf text-center display-6 fw-light px-3' data-aos="zoom-in">
                When an individual's life changes, they can change their community. When a community changes, they can
                <br className="d-none d-md-block" />
                <span className='text-danger bhf'> change society.</span>
              </p>
              <div className="text-center mt-4">
                <a className='text-decoration-none' href='/donate'>
                  <button className='bbbb' data-aos="fade-in-up">SUPPORT US</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Works;
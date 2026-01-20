import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './DonateForm.css';
import { useState, useEffect } from 'react';
import "react-country-state-city/dist/react-country-state-city.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import axios from 'axios';

const DonateForm = () => {
  useEffect(() => {
    AOS.init({
      offset: 120,
      duration: 1000,
      easing: 'ease',
      delay: 0,
      once: true
    });
  }, []);

  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [projectdetails, detailsfn] = useState({
    name: '',
    email: '',
    address: '',
    phonenumber: '',
    country: '',
    amount: '',
    state: '',
    city: '',
    pincode: '',
    gender: ''
  });

  // Validation helper functions
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const isValidPincode = (pincode) => {
    return /^\d{6}$/.test(pincode);
  };

  // Razorpay payment handler
  const initiateRazorpay = () => {
    const options = {
      key: 'rzp_test_ODJoHe6KjlLaCN', // Your Razorpay test key
      key_secret: 'Z5YZtsYzNATcFMZuhiuRiajx',
      amount: projectdetails.amount * 100, // Amount in paise
      currency: 'INR',
      name: 'GOGREEN TRUST',
      description: 'CREATE HELPING TENDENCY',
      handler: function(response) {
        alert('THANK YOU FOR YOUR DONATION');
        console.log('Payment successful:', response);
        
        // Reset form after successful payment
        detailsfn({
          name: '',
          email: '',
          address: '',
          gender: '',
          phonenumber: '',
          country: '',
          amount: '',
          state: '',
          city: '',
          pincode: ''
        });
        
        // Reset location selectors
        setCountry(null);
        setCurrentState(null);
        setCurrentCity(null);
        setIsSubmitting(false);
      },
      prefill: {
        name: projectdetails.name,
        email: projectdetails.email,
        contact: projectdetails.phonenumber
      },
      notes: {
        address: projectdetails.address
      },
      theme: {
        color: 'yellowgreen'
      },
      modal: {
        ondismiss: function() {
          setIsSubmitting(false);
          alert('Payment cancelled');
        }
      }
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  function sub(event) {
    event.preventDefault();
    
    // Comprehensive validation
    if (
      !projectdetails.name.trim() ||
      !projectdetails.email.trim() ||
      !projectdetails.address.trim() ||
      !projectdetails.phonenumber.trim() ||
      !projectdetails.country.trim() ||
      !projectdetails.state.trim() ||
      !projectdetails.city.trim() ||
      !projectdetails.amount.trim() ||
      !projectdetails.pincode.trim() ||
      !projectdetails.gender.trim()
    ) {
      alert("PLEASE ENTER ALL YOUR DETAILS");
      return;
    }

    // Validate email format
    if (!isValidEmail(projectdetails.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate phone number
    if (!isValidPhone(projectdetails.phonenumber)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    // Validate pincode
    if (!isValidPincode(projectdetails.pincode)) {
      alert("Pincode must be exactly 6 digits");
      return;
    }

    // Validate amount
    if (parseFloat(projectdetails.amount) <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    setIsSubmitting(true);

    // Submit to backend first
    axios.post("http://127.0.0.1:8000/detail/doner/", projectdetails)
      .then(response => {
        console.log(response.data);
        // After successful backend submission, open Razorpay
        initiateRazorpay();
      })
      .catch(err => {
        console.error("Submission error:", err);
        alert("There was an error submitting your donation. Please try again.");
        setIsSubmitting(false);
      });
  }

  function take(event) {
    const { name, value } = event.target;
    detailsfn({ ...projectdetails, [name]: value });
  }

  return (
    <>
      {/* Form Section */}
      <div className="container-fluid dff">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className='form-container p-3 p-md-5' data-aos="fade-up">
              <h2 className="text-center mb-4 form-title" style={{color:'white'}}>
                Kindly fill your details for <br/>the donation
              </h2>
              
              <Form onSubmit={sub}>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>USER NAME</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    value={projectdetails.name}
                    onChange={take}
                    placeholder="Enter Your Name"
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>

                {/* Email & Amount Row */}
                <Row className="mb-3">
                  <Form.Group as={Col} xs={12} md={6} className="mb-3 mb-md-0">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name='email'
                      value={projectdetails.email}
                      onChange={take}
                      placeholder="Enter Your Email"
                      required
                      disabled={isSubmitting}
                      style={{
                        borderColor: projectdetails.email && !isValidEmail(projectdetails.email)
                          ? "red"
                          : ""
                      }}
                    />
                    {projectdetails.email && !isValidEmail(projectdetails.email) && (
                      <small style={{ color: "red" }}>Invalid email format (e.g., example@email.com)</small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>Amount (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name='amount'
                      value={projectdetails.amount}
                      onChange={take}
                      placeholder="Enter Your Amount"
                      min="1"
                      step="1"
                      required
                      disabled={isSubmitting}
                    />
                  </Form.Group>
                </Row>

                {/* Address */}
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name='address'
                    value={projectdetails.address}
                    onChange={take}
                    placeholder="Enter Your Address"
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>

                {/* Gender & Phone Row */}
                <Row className="mb-3">
                  <Form.Group as={Col} xs={12} md={6} className="mb-3 mb-md-0">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name='gender'
                      value={projectdetails.gender}
                      onChange={take}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select Your Gender</option>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="PREFER NOT TO SAY">PREFER NOT TO SAY</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name='phonenumber'
                      value={projectdetails.phonenumber}
                      maxLength="10"
                      type='text'
                      pattern="\d*"
                      onChange={take}
                      placeholder="Enter Your Phone Number"
                      required
                      disabled={isSubmitting}
                      onInput={(e) => {
                        // Only allow digits
                        e.target.value = e.target.value.replace(/\D/g, '');
                        if (e.target.value.length > 10) {
                          e.target.value = e.target.value.slice(0, 10);
                        }
                      }}
                      style={{
                        borderColor: projectdetails.phonenumber && !isValidPhone(projectdetails.phonenumber)
                          ? "red"
                          : "",
                      }}
                    />
                    {projectdetails.phonenumber && !isValidPhone(projectdetails.phonenumber) && (
                      <small style={{ color: "red" }}>Phone number must be exactly 10 digits</small>
                    )}
                  </Form.Group>
                </Row>

                {/* Country, State, City Row */}
                <Row className="mb-3">
                  <Form.Group as={Col} xs={12} md={4} className="mb-3 mb-md-0">
                    <Form.Label>COUNTRY</Form.Label>
                    <CountrySelect
                      containerClassName="form-group"
                      onChange={(_country) => {
                        setCountry(_country);
                        setCurrentState(null);
                        setCurrentCity(null);
                        detailsfn({
                          ...projectdetails,
                          country: _country.name,
                          state: '',
                          city: ''
                        });
                      }}
                      placeHolder="Select Country"
                      disabled={isSubmitting}
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={4} className="mb-3 mb-md-0">
                    <Form.Label>STATE</Form.Label>
                    <StateSelect
                      countryid={country?.id}
                      containerClassName="form-group"
                      onChange={(_state) => {
                        setCurrentState(_state);
                        setCurrentCity(null);
                        detailsfn({
                          ...projectdetails,
                          state: _state.name,
                          city: ''
                        });
                      }}
                      placeHolder="Select State"
                      disabled={isSubmitting || !country}
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label>CITY</Form.Label>
                    <CitySelect
                      countryid={country?.id}
                      stateid={currentState?.id}
                      containerClassName="form-group"
                      onChange={(_city) => {
                        setCurrentCity(_city);
                        detailsfn({ ...projectdetails, city: _city.name });
                      }}
                      placeHolder="Select City"
                      disabled={isSubmitting || !currentState}
                    />
                  </Form.Group>
                </Row>

                {/* Pincode */}
                <Row className="mb-3">
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>PINCODE</Form.Label>
                    <Form.Control
                      name='pincode'
                      value={projectdetails.pincode}
                      onChange={take}
                      type='text'
                      pattern="\d*"
                      placeholder="Enter Your Pincode"
                      required
                      disabled={isSubmitting}
                      onInput={(e) => {
                        // Only allow digits
                        e.target.value = e.target.value.replace(/\D/g, '');
                        if (e.target.value.length > 6) {
                          e.target.value = e.target.value.slice(0, 6);
                        }
                      }}
                      style={{
                        borderColor: projectdetails.pincode && !isValidPincode(projectdetails.pincode)
                          ? "red"
                          : "",
                      }}
                    />
                    {projectdetails.pincode && !isValidPincode(projectdetails.pincode) && (
                      <small style={{ color: "red" }}>Pincode must be exactly 6 digits</small>
                    )}
                  </Form.Group>
                </Row>

                {/* Submit Button */}
                <div className="text-center mt-4 mb-4">
                  <div className="btn">
                    <span className='btnInner' onClick={sub} style={{
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.6 : 1
                    }}>
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                    </span>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <div className="space"></div>
      
      <footer className="footer" style={{background: 'linear-gradient(yellowgreen, green)'}}>
        <div className="footer-content">
          <div className="footer-section" data-aos="zoom-in">
            <h3 className='text-start ms-3'>About Us</h3>
            <ul className='ms-3'>
              <li><a href="/aboutus" className='n'>Our Mission</a></li>
              <li><a href="/aboutus" className='n'>Our Vision</a></li>
              <li><a href="/aboutus" className='n'>Our values</a></li>
              <li><a href="/aboutus" className='n'>Our Impact</a></li>
              <li><a href="/aboutus" className='n'>Join Our Cause</a></li>
              <li><a href="/aboutus" className='n'>Our Experience</a></li>
            </ul>
          </div>
          
          <div className="footer-section text-start" data-aos="zoom-in">
            <h3 className='ms-3'>Contact Us</h3>
            <ul className='ms-3'>
              <li>Email: <a href="mailto:gogreen@trustwebsite.com">gogreen@trustwebsite.com</a></li>
              <li>Phone: 123-456-7890</li>
              <li>Address: GoGreen Trust,<br/>
                72 Holloway Road,<br/>
                London,<br/>
                N7 8JG,<br/>
                United Kingdom
              </li>
            </ul>
          </div>

          <div className="footer-section" data-aos="zoom-in">
            <h3 className='ms-3'>Follow Us</h3>
            <ul className="social-links ms-3">
              <li><a href="#" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-instagram me-2" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
              </a></li>
              <li><a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook me-2" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                </svg>
              </a></li>
              <li><a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-twitter-x me-2" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </a></li>
              <li><a href="#" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-linkedin ms-2" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom" data-aos="fade-in" data-aos-duration="200">
          <p className='pt-5'>&copy; 2025 Trust Website. All Rights Reserved.</p>
        </div>
      </footer>
      <div className='d-flex justify-content-center pt-3 footer-credit'>
        <span>Designed by : HARIHARASUDHAN</span> <br></br>
    
        <span className='credit'>Contact :<a href='tel:+917010458527'> +91 7010458527</a></span><br></br>
        <span className='creditt'>Powered by : <a href='/'>GoGreen Trust</a></span>
</div>
    </>
  );
}

export default DonateForm;
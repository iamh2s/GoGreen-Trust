import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './DonateForm.css';
import {useState} from 'react'
import "react-country-state-city/dist/react-country-state-city.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'; 

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Bank from './Bank';


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

  
 const [projectdetails,detailsfn]=useState({
  name:'',
  email:'',
  address:'',
  phonenumber:'',
  country:'',
  amount:'',
  state:'',
  city:'',
  pincode:'',
  gender:''
})
const[getdetails,setdetails]=useState([])

const nav =useNavigate();
function sub(event){
  event.preventDefault();
  if(
    projectdetails.name === '' ||
    projectdetails.email === '' ||
    projectdetails.address === '' ||
    projectdetails.phonenumber === '' ||
    projectdetails.country === '' ||
    projectdetails.state === '' ||
    projectdetails.city === '' ||
    projectdetails.amount === '' ||
    projectdetails.pincode === '' ||
    projectdetails.gender === ''
  ){
    alert("PLEASE ENTER ALL YOUR DETAILS");
    return;
  }
  

  
  setdetails([...getdetails,projectdetails])
  console.log(getdetails)

 localStorage.setItem("amount", projectdetails.amount)
   axios.post("http://127.0.0.1:8000/detail/doner/",projectdetails)
  .then(response=>console.log(response.data)
  )
  .catch(err=>console.log(err)
  )

  // localStorage.setItem('details', (getdetails))
   detailsfn({
    name:'',
    email:'',
    address:'',
    gender:'',
    phonenumber:'',
    country:'',
    amount:'',
    state:'',
    city:'',
    pincode:''
})
if(
  projectdetails.name !== '' ||
  projectdetails.email !== '' ||
  projectdetails.address !== '' ||
  projectdetails.phonenumber !== '' ||
  projectdetails.country !== '' ||
  projectdetails.state !== '' ||
  projectdetails.city !== '' ||
  projectdetails.amount !== '' ||
  projectdetails.pincode !== '' ||
    projectdetails.gender !== ''
){
  nav('/bank')
}

}
  function take(event){
    const {name,value}=event.target
    detailsfn({...projectdetails,[name]:value})
    console.log(projectdetails);
    
  }



  
  return (
    <>
    <div className="conatiner-fluid">
      <div className="row">
        <div className="col-md-12">
    <div className='text-center  p-5 form' >
      
      <Form  data-aos="fade-up">
       
       <Form.Label>USER NAME</Form.Label>
    <Form.Control  type='text' name='name'  value={projectdetails.name} onChange={take} placeholder="Enter Your Name" required />
    <Row className="mb-3 mt-3">
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name='email' value={projectdetails.email} onChange={take}  placeholder="Enter Your Email" required style={{
      borderColor: projectdetails.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(projectdetails.email) 
        ? "red" 
        : ""
    }} />
          {projectdetails.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(projectdetails.email) && (
         <small style={{ color: "red" }}>Invalid email format please include '@' inbetween </small>
          )}

      </Form.Group>
    </Row>
    <Row className="mb-3 mt-3">
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" name='amount' value={projectdetails.amount} onChange={take} placeholder="Enter Your Amount" required/>
      </Form.Group>
    </Row>

    <Form.Group className="mb-3" controlId="formGridAddress1">
      <Form.Label>Address</Form.Label>
      <Form.Control name='address' value={projectdetails.address} onChange={take} placeholder="Enter Your Address" required/>
    </Form.Group>
          
    <p >Gender</p>
    
    <Form.Select aria-label="Default select example" name='gender' value={projectdetails.gender}  onChange={take} className=' mb-3' style={{marginTop:'-10px'}}>
  
      <option>Select Your Gender </option>
      <option value="MALE">MALE</option>
      <option value="FEMALE">FEMALE</option>
      <option value="PREFER NOT TO SAY">PREFER NOT TO SAY</option>
    </Form.Select>
  

    <Form.Group className="mb-3" controlId="formGridAddress2">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control name='phonenumber' value={projectdetails.phonenumber} maxLength="10" type='number' onChange={take} placeholder="Enter Your Phone Number" required
       onInput={(e) => {
        if (e.target.value.length > 10){
          e.target.value = e.target.value.slice(0,10);
        }
        }}
           style={{
            borderColor: projectdetails.phonenumber &&
              !/^\d{10}$/.test(projectdetails.phonenumber)
              ? "red"
              : "",
          }}
        />
        {projectdetails.phonenumber && !/^\d{10}$/.test(projectdetails.phonenumber) && (
          <small style={{ color: "red" }}>Phone number must be 10 digits</small>
        )}
    
    </Form.Group>

    <Row className="mb-3">

    <Form.Group  as={Col}controlId="formGridState">
    <Form.Label>COUNTRY</Form.Label>

    <CountrySelect
            containerClassName="form-group"
            inputClassName=""
onChange={(_country) => {
  setCountry(_country);
  detailsfn({
    ...projectdetails,
    country: _country.name,
    state: '', 
    city: ''    
  });
}}
            onTextChange={(_txt) => console.log(_txt)}
            placeHolder="Select Country"
            name='country'
            value={projectdetails.country}
        
            
          />
          </Form.Group>
      <Form.Group  as={Col}controlId="formGridState">
        <Form.Label>STATE</Form.Label>
  
        <StateSelect
            countryid={country?.id}
            containerClassName="form-group"
            inputClassName=""
onChange={(_state) => {
  setCurrentState(_state);
  detailsfn({
    ...projectdetails,
    state: _state.name,
    city: ''  
  });
}}
            onTextChange={(_txt) => console.log(_txt)}
            defaultValue={currentState}
            placeHolder="Select State"
            name='state'
            value={projectdetails.state}
         
          />
      </Form.Group>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>CITY</Form.Label>
 
        <CitySelect
        
            countryid={country?.id}
            stateid={currentState?.id}
            containerClassName="form-group"
            inputClassName=""
            onChange={(_city) => {
             setCurrentCity(_city);
             detailsfn({ ...projectdetails, city: _city.name});
            }}
            onTextChange={(_txt) => console.log(_txt)}
            defaultValue={currentCity}
            placeHolder="Select City"
            name='city'
            value={projectdetails.city}
          
          />

      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>PINCODE</Form.Label>
        <Form.Control   name='pincode' value={projectdetails.pincode}  onChange={take} type='number' placeHolder="Enter Your Pincode"
         onInput={(e) => {
      if (e.target.value.length > 6){
        e.target.value = e.target.value.slice(0,6);
      }
      }}
    
    style={{
      borderColor: projectdetails.pincode &&
        !/^\d{6}$/.test(projectdetails.pincode)
        ? "red"
        : "",
    }}
  />
  {projectdetails.pincode && !/^\d{6}$/.test(projectdetails.pincode) && (
    <small style={{ color: "red" }}>Pincode must be exactly 6 digits</small>
  )}
      </Form.Group>

    </Row>
     <div className="btn mt-3 mb-5">
     <span className='btnInner' onClick={sub}>SUBMIT</span>
    </div>
  {/* <Bank data={getdetails}/> */}
  </Form>
  
  {/* <Admmain userdata={projectdetails}/> */}
 </div>
 </div>              

 </div>
 </div>

 


 <div className="df pt-5" style={{backgroundColor:'darkgreen'}}>
 <footer className="footer">
      <div className="footer-content">
      
        <div className="footer-section" data-aos="zoom-in">
          <h3 className='ms-3'>About Us</h3>
          <ul>
           
          <li><a href="/aboutus" className='n ms-3'>Our Mission</a></li>
            <li><a href="/aboutus" className='n ms-3'>Our Vision</a></li>
            <li><a href="/aboutus" className='n ms-3'>Our values</a></li>
            <li><a href="/aboutus" className='n ms-3'>Our Impact</a></li>
            <li><a href="/aboutus" className='n ms-3'>Join Our Cause</a></li>
            <li><a href="/aboutus" className='n ms-3'>Our Experience</a></li>
          </ul>
        </div>
        <div className="footer-section" data-aos="zoom-in" >
          <h3 className='ms-3'>Contact Us</h3>
          <ul className='ms-3'>
            <li>Email: <a href="mailto:support@trustwebsite.com">gogreen@trustwebsite.com</a></li>
            <li>Phone: 123-456-7890</li>
            <li>Address: 123 Trust St, City, Country</li>
          </ul>
        </div>

     
        <div className="footer-section" data-aos="zoom-in">
          <h3 className='ms-3'>Follow Us</h3>
          <ul className="social-links ms-3">
              <li><a href="#">
                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-instagram me-2" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
           </svg>
      
           </a></li>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook me-2" viewBox="0 0 16 16">
             <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
              </svg></a></li>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-twitter-x me-2" viewBox="0 0 16 16">
             <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
             </svg></a></li>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-linkedin ms-2" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
           </svg></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom" data-aos="fade-in" data-aos-duration="200" >
        <p>&copy; 2025 Trust Website. All Rights Reserved.</p>
      </div>
    </footer>
 </div>
 </>
 
 
   
  )
}

export default DonateForm
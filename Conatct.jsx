import React, { useEffect, useState } from 'react'
import'./Contact.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer'



const Conatct = () => {
      useEffect(() => {
        AOS.init({
          offset: 120,    
          duration: 1000,    
          easing: 'ease',   
          delay: 50,         
          once: false,      
           disable: window.innerWidth < 768
        });
      }, []);
      const [projectdetails,detailsfn]=useState({
        name:'',
        email:'',
        gender:'',
        phonenumber:'',
        comment:''
      })
      function take(event){
        const {name,value}=event.target
        detailsfn({...projectdetails,[name]:value})
        console.log(projectdetails);
  }
      const[getdetails,setdetails]=useState([])
      function sub(event){
        event.preventDefault(); 
        if(projectdetails.name==='' || projectdetails.email==='' || projectdetails.gender=== '' || projectdetails.phonenumber==='' || projectdetails.comment==='') {
         alert('PLEASE ENTER THE GENERAL ENQUIRIES')
         return
        }
        setdetails([...getdetails,projectdetails])
        detailsfn({
          name:'',
          email:'',
          gender:'',
          phonenumber:'',
          comment:''
        })
        alert('THANK YOU FOR YOUR TIME')
      }
        return (
    <>
    <div className="aboutus-container-fluid" >
    <div className="aboutus-header pt-5" data-aos='zoom-in'>
        <h1>CONTACT US</h1>
        <div className="underline"></div>
      </div>
      <div className="row" >
        <div className="col-md-12 text-center" data-aos='zoom-out-right'>
         <h2 className='fs-5 fw-bold' style={{color:'darkgreen'}}>TELEPHONE</h2>
         <h1 className='fs-1 fw-bold'> 123-456-7890</h1>

         <h2 className='mt-5 fs-5 fw-bold' style={{color:'darkgreen'}}>POST</h2>
         <h1 className='fs-4' style={{fontWeight:'600'}}>
         GoGreen Trust,<br></br>
         72 Holloway Road,<br></br>
         London,<br></br>
         N7 8JG,<br></br>
         United Kingdom
         </h1>
         <h2 className='mt-5 fs-5 fw-bold' style={{color:'darkgreen'}}>EMAIL</h2>
         <h1 className='fs-5' style={{fontWeight:'600'}}>gogreen@trustwebsite.com
                </h1>

 </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Conatct
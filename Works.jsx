import React from 'react'
import { FaAppleAlt } from "react-icons/fa";
import Footer from './Footer';
import { Link } from 'react-router-dom'
import './Work.css';


const Works = () => {
  return (
    <div>
    <>
  
    <div className="container-fluid">
    
    <h3 className="sponcers text-center" data-aos="zoom-in-up" style={{fontWeight:"400",marginTop:'50px'}}>OUR AREA OF FOCUS</h3>
    
    <div className="line" data-aos="zoom-out-right"></div>
    <div id="ps"></div>
    <p className='ak text-center'   data-aos="zoom-out-right" style={{fontSize:'100px'}}> .</p>
    <p className='ak1 text-center'  data-aos="zoom-out-left" style={{fontSize:'100px'}}> .</p>
    <p className='ak1 text-center'   data-aos="zoom-out-right"style={{fontSize:'100px'}}> .</p>
    <p className='ak1 text-center'  data-aos="zoom-out-left" style={{fontSize:'100px'}}> .</p>
    <p className='ak1 text-center'  data-aos="zoom-out-right" style={{fontSize:'100px'}}> .</p>
    <p className='ak1 text-center'  data-aos="zoom-out-left" style={{fontSize:'100px'}}> .</p>

  
  <div className="row">
          
      <p className='fs-2 mt-3 text-center'data-aos="zoom-in-up" style={{color:'darkgreen'}}> <span>
      <svg xmlns="http://www.w3.org/2000/svg"  style={{marginTop:'-15px'}} width="40" height="40" fill="currentColor" className="bi bi-house-heart-fill" viewBox="0 0 16 16">
<path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"/>
<path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"/>  </svg>
       </span> 
        <span> PROVIDING SHELTERS</span></p>
        <img src="public/retro-floral-decorative-graphic-element.png" data-aos="zoom-in-up" style={{width:'300px',height:'50px',marginLeft:'480px',marginTop:'-20px'}}/><br></br>
    <div className="col-6 text-center" style={{marginLeft:'-750px',marginTop:'90px'}}>
     <p data-aos="zoom-out-right">Historically, many communities have collaborated with <span style={{color:'green'}}> GOGREEN </span> to provide shelters for cows and dogs. We also buy cows from farmers and owners at a fair price and offer them a safe home with proper food and care. Owners are welcome to visit our facility and spend time with their cows.Additionally, we provide shelter for dogs, adopting them from owners who can no longer care for them.The primary mission of <span style={{color:'green'}}> GOGREEN </span> is to protect and nurture these animals, as they are part of God’s creation. We have become a role model for many individuals who share our passion for animal welfare.</p>
    <div  className="fli"></div>
    <img src="public/cows-grazing-nature.jpg  " data-aos="zoom-out-right" style={{width:'600px',zIndex:'20',height:'400px',marginTop:'-800px',marginLeft:'100px',borderRadius:'10px'}}/>
    </div>
    <div className="col-5">
       <img src="public/Adobe Express - file.png" data-aos="zoom-out-left" style={{width:'600px',height:'600px',marginLeft:'-80px',paddingTop:'70px'}} />
       <p style={{fontSize:'70px',fontFamily:'times-new-roman',paddingLeft:'300px',marginTop:'-60px'}} data-aos="zoom-out" >96%</p>
       <p className='text-end a96' data-aos="zoom-out">96% of our sheltering spaces are<br></br> nearly full, and we are actively <br></br>searching for new  locations. <br></br>Therefore, we kindly request <br></br>your support in raising <br></br> funds. <span> 
         {/* <a href='/donate'> <button className='bbb mt-2'>SUPPORT US</button></a> */}<br></br>
        
        <br>

       </br>   
     
       </span></p>
       <div id="pf"></div>
      
       <p className='so' data-aos="zoom-in-left"> |</p>
      </div>
       </div>
       


  <div className="row h">
 
  <p className='fs-2 text-center' data-aos="zoom-in-up" style={{color:'darkgreen'}}>
          <FaAppleAlt  className='apple' /> PROVIDING FOOD</p>
        <img src="public/retro-floral-decorative-graphic-element.png"  data-aos="zoom-in-up" style={{width:'300px',height:'50px',marginLeft:'480px',marginTop:'-20px'}}/><br></br>
   
    <div className="col-6">
        <img src='cow2.png'className='cow2'data-aos="zoom-in-left" style={{height:'800px',width:'500px'}}/>
       
    </div>
    <div className="col-5">
     <p className='mt-5 text-center' data-aos="zoom-in-right"><span style={{ color: 'green' }}>GOGREEN</span> also supports animals like dogs and cows by providing them with food and water in our shelters.<br></br> Our plan is to help these creatures consistently and compassionately from generation to generation.We encourage volunteers and animal lovers to visit, interact with, and support our mission.We conduct educational programs to promote kindness toward animals and responsible pet ownership.</p>
     <div className="flo2"></div>
     <img src="public/A beginner’s guide to understanding healthy dog diets.jpg" data-aos="zoom-in-right" className='dogi' style={{width:'500px',height:'400px'}}/>
     <p className='dow' data-aos="zoom-in-up">We encourage volunteers, animal lovers, and supporters to visit our shelters, interact with the animals, and contribute to our mission.
     {/* <Link to='/donate'> <button className='bbb mt-2'>SUPPORT US</button></Link>   */}
     <a href='/donate'> <button className='bbb mt-2'>SUPPORT US</button></a>


      </p>
    </div>
  
  </div>
  <p className='ln text-center' data-aos="zoom-in-left">|</p>
  <div className="last">
       <p className='bhf text-center fs-1' data-aos="zoom-in">When an individual’s life changes, they can change their community. When a community changes, they can<br></br> <span className='text-danger bhf'>change society.</span>
       </p>
       <Link to='/donate'> <button className='bbbb mt-2' data-aos="fade-in-up" style={{marginLeft:'550px'}}>SUPPORT US</button></Link>

  </div>
  <Footer/>
  </div>
    </>
        </div>
  )
}

export default Works
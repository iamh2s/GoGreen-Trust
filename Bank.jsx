import React, { useEffect, useState } from 'react'
import './Bank.css';
import Footer from './Footer';

const Bank = (data) => {
    const[amount, setamount]=useState('')
    console.log(amount);

    useEffect(()=>{
        setamount(localStorage.getItem("amount"))
    },[amount])
    
    function sub(e){
     e.preventDefault();
     if(amount===''){
        alert('Please Enter Amount')
        return
     }
     
     else{
        e.preventDefault();
        var option={
            key:'rzp_test_ODJoHe6KjlLaCN',
            key_secret:'Z5YZtsYzNATcFMZuhiuRiajx',
            amount:amount *100,
            currency:'INR',
            name:'GOGREEN TRUST',
            description:'CREATE HELPING TENDENCY',
            handler: function(responce){
            alert('THANKYOU FOR YOUR DONATION')
            localStorage.removeItem("amount")
            setamount('')
            },
            prefill:{
                name:'Hariharasudhan',
                email:'harihari15953@gmail.com',
                contact:'7010458527'
            },
            notes:{
                address:'Razorpay Corpotate Office'
            },
            theme:{
                color:'yellowgreen'
            }
        }
        var pay =new window.Razorpay(option);
        pay.open()
       
        
     }
    }
  return (
<>
    <div className='no1 '>
        <lable for='amount' className='fs-2 text-center text-bolder eyt'>Enter The amount</lable><br></br>
        <input for='amount'className='inp mt-3' type='number' value={amount} onChange={(e)=>setamount(e.target.value)} placeholder='Enter Your Amount' readOnly></input><br></br><br></br>
        <button type='submit' className='me' onClick={sub}> Pay Now</button>
    
    </div>
    <Footer/>
    </>
  )
}

export default Bank
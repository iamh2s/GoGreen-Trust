import React, { useEffect, useState } from 'react';
import './Admini.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Administor = ({ setIsLoggedIn }) => {
    useEffect(() => {
        AOS.init({
            offset: 120,
            duration: 1000,
            easing: 'ease',
            delay: 0,
            once: false
        });
    }, []);
    useEffect(() => {
        // Prevent going back
        const handlePopState = () => {
            window.history.replaceState(null, "", window.location.href);
        };
        // Push the current state to the history stack
        window.history.replaceState(null, "", window.location.href);
        
        window.addEventListener('popstate', handlePopState);
        
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    const [details, setDetails] = useState({
        username: '',
        password: ''
    });
    const take = (event) => {
        const { name, value } = event.target;
        setDetails({ ...details, [name]: value });
        console.log(details);
    };
    const nav = useNavigate();
    const [detailsStore, setDetailsStore] = useState([]);
    const sub = (event) => {
        event.preventDefault(); 
        if (details.username === '' || details.password === '') {
            alert('PLEASE ENTER YOUR DETAILS');
            return;
        }
        setDetailsStore([...detailsStore, details]);
        setDetails({
            username: '',
            password: ''
        });
        if (details.username === 'bala' && details.password === 'bala1234') {
            nav('/admins');
            setIsLoggedIn(true);
        } 
        else if(details.username === 'ishu priya' && details.password === 'dhaya1234'){
            nav('/admins');
        }
        else {
            alert('Invalid username or password'); 
        }
    };
    return (
        <>
            <div className='container-fluid mt-3 foo' style={{ textAlign: 'center' }}>
                <div className="row">
                    <div className="col">
                        <p className='text-bolder fs-1 mt-4' data-aos="fade-right">Welcome Administrator !!</p>
                        <div>
                            <form className='f' data-aos="fade-left">
                                <label htmlFor='username' className='fs-3 mt-5'>Username</label><br />
                                <input 
                                    id='us' 
                                    placeholder='  Enter Your Username'  
                                    type='text' // Change 'name' to 'text'
                                    name='username' 
                                    onChange={take} 
                                    value={details.username} // Change to details.username
                                    required 
                                    // maxLength={7}
                                /><br />
                                <label htmlFor='password' className='mt-3 fs-3'>Password</label><br />
                                <input 
                                    id='pw' 
                                    placeholder='  Enter Your Password'  
                                    type='password' 
                                    maxLength={10} 
                                    onChange={take} 
                                    name='password' 
                                    value={details.password} // Change to details.password
                                    required 
                                /><br /><br />
                                <button type='submit' className='baa fs-4 mt-5' onClick={sub}>LOGIN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="foo">
                <Footer />
            </div>
        </>
    );
};
export default Administor;
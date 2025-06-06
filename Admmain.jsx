import { useEffect, useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import './Admmain.css';
import { useNavigate } from "react-router-dom";
const DonorList = ({ setIsLoggedIn }) => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState("none"); 
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/detail/doner/");
                setDonors(response.data);
            } catch (error) {
                console.error("Error fetching donors:", error);
                setError("Failed to load donor data.");
            } finally {
                setLoading(false);
            }
        };
        fetchDonors();
    }, []);
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    }, []);
    const handleLogout = () => {
        sessionStorage.removeItem("isLoggedIn"); 
        setIsLoggedIn(false); 
        navigate("/", { replace: true });
    };
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value); 
    };
    return (
        <>
            <div className="adminsee">
                <div className="container">
                    {loading && <p>Loading donors...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    <h2 className="mt-5">All Donors</h2>
                    <div className="row">
                        {donors.map((donor, index) => (
                            <div className="col mt-5 mb-5" key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body className="text-center">
                                        <Card.Title>DONOR DETAILS</Card.Title><br />
                                        <Card.Text className="text-bolder">
                                            <p>Name: {donor.name}</p>
                                            <p>Email: {donor.email}</p>
                                            <p>Amount: {donor.amount}</p>
                                            <p>Address: {donor.address}</p>
                                            <p>Gender: {donor.gender}</p> 
                                            <p>Phone number: {donor.phonenumber}</p>
                                            <p>Country: {donor.country}</p> 
                                            <p>State: {donor.state}</p> 
                                            <p>City: {donor.city}</p> 
                                            <p>Pincode: {donor.pincode}</p> 
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="adminsee pb-5">
                <div className="container">
                    <h2 className="mt-5">SELECT DONOR VIEW</h2>
                    <select className="form-select" onChange={handleDropdownChange}>
                        <option value="none">Select an option</option>
                        <option value="lessThan1000">Donors Who Donated Less Than 1000</option>
                        <option value="GreaterThan1000">Donors Who Donated Greater Than 1000</option>
                    </select>
                    
                    {selectedOption === "lessThan1000" && (
                        <table className="table table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Address</th>
                                    <th>Gender</th>
                                    <th>Phone Number</th>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Pincode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donors
                                    .filter(donor => donor.amount < 1000) 
                                    .map((donor, index) => (
                                        <tr key={index}>
                                            <td>{donor.name}</td>
                                            <td>{donor.email}</td>
                                            <td>{donor.amount}</td>
                                            <td>{donor.address}</td>
                                            <td>{donor.gender}</td>
                                            <td>{donor.phonenumber}</td>
                                            <td>{donor.country}</td>
                                            <td>{donor.state}</td>
                                            <td>{donor.city}</td>
                                            <td>{donor.pincode}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                     {selectedOption === "GreaterThan1000" && (
                        <table className="table table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Address</th>
                                    <th>Gender</th>
                                    <th>Phone Number</th>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Pincode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donors
                                    .filter(donor => donor.amount > 1000) 
                                    .map((donor, index) => (
                                        <tr key={index}>
                                            <td>{donor.name}</td>
                                            <td>{donor.email}</td>
                                            <td>{donor.amount}</td>
                                            <td>{donor.address}</td>
                                            <td>{donor.gender}</td>
                                            <td>{donor.phonenumber}</td>
                                            <td>{donor.country}</td>
                                            <td>{donor.state}</td>
                                            <td>{donor.city}</td>
                                            <td>{donor.pincode}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};
export default DonorList;
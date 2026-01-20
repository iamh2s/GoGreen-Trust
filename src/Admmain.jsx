import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "./Admmain.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";



const DonorList = ({ setIsLoggedIn }) => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("none");
  const [clickedButtons, setClickedButtons] = useState({});
  const navigate = useNavigate();

  // Optional: axios defaults for CSRF if you use session auth
  // axios.defaults.xsrfCookieName = "csrftoken";
  // axios.defaults.xsrfHeaderName = "X-CSRFToken";
  // axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/detail/doner/");
        setDonors(response.data);
      } catch (err) {
        console.error("Error fetching donors:", err);
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

  useEffect(() => {
    AOS.init({
      offset: 20,
      delay: 0,
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const markButtonClicked = (donorKey, action) => {
    setClickedButtons((prev) => ({
      ...prev,
      [`${donorKey}-${action}`]: true,
    }));
  };

  // Robust logAction: sends POST to backend and logs results
  const logAction = async (donorId, actionType) => {
    try {
      const payload = { donor_id: donorId, action_type: actionType };
      console.log("Sending logAction:", payload);
      const response = await axios.post("http://127.0.0.1:8000/donor/action/", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("logAction response:", response.status, response.data);
      return response.data;
    } catch (err) {
      console.error("logAction failed:", err.response?.status, err.response?.data || err.message);
      return null;
    }
  };

  // Try to open a link reliably (location.href fallback)
  const openLink = (url) => {
    try {
      window.location.href = url;
      setTimeout(() => {
        window.location.href = url;
      }, 200);
    } catch (e) {
      console.error("openLink error:", e);
    }
  };

  // Email: log first (non-blocking), update UI, then open mail client
//   const sendEmail = (donor) => {
//     const subject = encodeURIComponent("Thank You for Your Donation");
//     const body = encodeURIComponent(
//  `Thanks ${donor.name} for your donation of ${donor.amount}. Keep supporting us and donate more for these living creatures.
// Create helping tendency 
//  -GOGREEN-TRUST.
//  THANK YOU`
//     );

//     const donorKey = donor.id ?? donor.email;
//     markButtonClicked(donorKey, "email");

//     logAction(donor.id, "email").finally(() => {
//       const mailto = `mailto:${donor.email}?subject=${subject}&body=${body}`;
//       openLink(mailto);
//     });
//   };


  const callPhone = (donor) => {
    const donorKey = donor.id ?? donor.phonenumber;
    markButtonClicked(donorKey, "phone");

    logAction(donor.id, "phone").finally(() => {
      const tel = `tel:${donor.phonenumber}`;
      openLink(tel);
    });
  };

  const sendMessage = (donor) => {
    const message = encodeURIComponent(
      `Thanks ${donor.name} for your donation of ${donor.amount}. Keep supporting us and donate more for these living creatures.
Create helping tendency 
 -GOGREEN-TRUST.
 THANK YOU`
    );

    const donorKey = donor.id ?? donor.phonenumber;
    markButtonClicked(donorKey, "message");

    logAction(donor.id, "message").finally(() => {
      const sms = `sms:${donor.phonenumber}?body=${message}`;
      openLink(sms);
    });
  };

  return (
    <>
      <div className="adminsee">
        <Container>
          {loading && <p>Loading donors...</p>}
          {error && <p className="text-danger">{error}</p>}

          <h2 className="text-center" style={{ paddingTop: "100px" }}>
            All Donors
          </h2>

          <Row>
            {donors.map((donor, index) => {
              const key = donor.id ?? index;
              return (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  className="mt-4 mb-4 d-flex"
                  key={key}
                  data-aos="zoom-in"
                  data-aos-delay={index * 10}
                >
                  <Card className="donor-card h-100" style={{ width: "400px" }}>
                    <Card.Body className="text-center">
                      <Card.Title>DONOR DETAILS</Card.Title>
                      <Card.Text>
                        <p><strong>Name:</strong> {donor.name}</p>
                        <p><strong>Email:</strong> {donor.email}</p>
                        <p><strong>Amount:</strong> {donor.amount}</p>
                        <p><strong>Address:</strong> {donor.address}</p>
                        <p><strong>Gender:</strong> {donor.gender}</p>
                        <p><strong>Phone:</strong> {donor.phonenumber}</p>
                        <p><strong>Country:</strong> {donor.country}</p>
                        <p><strong>State:</strong> {donor.state}</p>
                        <p><strong>City:</strong> {donor.city}</p>
                        <p><strong>Pincode:</strong> {donor.pincode}</p>
                      </Card.Text>

                      <div className="d-flex justify-content-around mt-3">
                        <button
                          className={`message_btn ${
                            clickedButtons[`${key}-phone`] ? "clicked" : ""
                          }`}
                          onClick={() => callPhone(donor)}
                        >
                          {clickedButtons[`${key}-phone`] ? "Call " : "Call "}
                        </button>

                        <button
                          className={`message_btn ${
                            clickedButtons[`${key}-message`] ? "clicked" : ""
                          }`}
                          onClick={() => sendMessage(donor)}
                        >
                          {clickedButtons[`${key}-message`] ? "Message " : "Message "}
                        </button>

                        {/* <button
                          className={`message_btn ${
                            clickedButtons[`${key}-email`] ? "clicked" : ""
                          }`}
                          onClick={() => sendEmail(donor)}
                        >
                          {clickedButtons[`${key}-email`] ? "Email " : "Email "}
                        </button> */}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>

        <div className="d-grid mt-3 pb-4">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="adminsee pb-5">
        <Container>
          <h2 className="pt-5 text-center">Select Donor View</h2>
          <Form.Select
            className="mt-3"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="none">Select an option</option>
            <option value="lessThan1000">Donors Who Donated Less Than 1000</option>
            <option value="GreaterThan1000">Donors Who Donated Greater Than 1000</option>
          </Form.Select>

          {selectedOption !== "none" && (
            <div className="table-responsive mt-3" data-aos="fade-up">
              <Table bordered striped hover>
                <thead className="table-dark">
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
                    .filter((donor) =>
                      selectedOption === "lessThan1000"
                        ? donor.amount < 1000
                        : donor.amount > 1000
                    )
                    .map((donor, index) => (
                      <tr key={donor.id ?? index}>
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
              </Table>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default DonorList;

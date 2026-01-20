import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Admini.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Administor = ({ setIsLoggedIn }) => {
  const nav = useNavigate();
  const [details, setDetails] = useState({ username: "", password: "" });

  // ✅ Initialize AOS
  useEffect(() => {
    AOS.init({
      offset: 120,
      duration: 1000,
      easing: "ease",
      delay: 50,
      once: false,
    });
  }, []);

  // ✅ Prevent back navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  // ✅ Check sessionStorage on mount
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
      nav("/admins", { replace: true });
    }
  }, [nav, setIsLoggedIn]);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  // ✅ Handle login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.username === "" || details.password === "") {
      alert("PLEASE ENTER YOUR DETAILS");
      return;
    }

    if (details.username === "gogreen" && details.password === "1234" || details.username === "joemathew" && details.password === '7010') {
      sessionStorage.setItem("isLoggedIn", "true"); // persist login
      setIsLoggedIn(true);
      nav("/admins", { replace: true });
    } else {
      alert("Invalid username or password");
    }

    setDetails({ username: "", password: "" });
  };

  // ✅ Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    nav("/", { replace: true });
  };

  return (
    <>
      <div
        className="foo d-flex align-items-center"
        style={{ minHeight: "100vh", paddingTop: "80px" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <div className="text-center mb-4" data-aos="fade-right">
                <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  Welcome Administrator !!
                </h1>
              </div>
              <div
                className="card shadow-lg"
                style={{ borderRadius: "20px", border: "none" }}
                data-aos="fade-left"
              >
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="us"
                        className="form-label"
                        style={{ fontWeight: "600" }}
                      >
                        Username
                      </label>
                      <input
                        id="us"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Username"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={details.username}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="pw"
                        className="form-label"
                        style={{ fontWeight: "600" }}
                      >
                        Password
                      </label>
                      <input
                        id="pw"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Password"
                        type="password"
                        maxLength={10}
                        onChange={handleChange}
                        name="password"
                        value={details.password}
                        required
                      />
                    </div>
                    <div className="d-grid mt-4">
                      <button type="submit" className="btn-lg baa">
                        LOGIN
                      </button>
                    </div>
                  </form>

                  {/* ✅ Logout button (visible if logged in) */}
                  {sessionStorage.getItem("isLoggedIn") && (
                    <div className="d-grid mt-3">
                      <button
                        onClick={handleLogout}
                        className="btn btn-danger btn-lg"
                      >
                        LOGOUT
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Administor;

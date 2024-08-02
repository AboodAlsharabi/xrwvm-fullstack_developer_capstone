import React, { useState } from "react";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Register.css";

const Register = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");


  const gohome = ()=> {
    window.location.href = window.location.origin;
  }

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin+"/djangoapp/register";
    
    const res = await fetch(register_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password,
            "firstName":firstName,
            "lastName":lastName,
            "email":email
        }),
    });

    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    }
    else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
};

  return(
    <div>
    <Header />
    <div className="container my-5">
    <div className="row d-flex d-xl-flex justify-content-center justify-content-xl-center">
        <div className="col-sm-12 col-lg-10 col-xl-9 col-xxl-7 bg-white shadow-lg">
            <div className="p-5">
                <div className="text-center">
                    <h4 className="text-dark mb-4">Create an Account!</h4>
                </div>
                <form className="user" onSubmit={register}>
                    <div className="form-group mb-3">
                        <div className="input-group"><span className="bg-white input-group-text InputBorder"><svg className="bi bi-person-fill" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
                                </svg></span><input className="form-control InputBorder" type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Username"  /></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <div className="form-group mb-3">
                                <div className="input-group"><span className="bg-white input-group-text InputBorder"><svg className="bi bi-person-lines-fill" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"></path>
                                        </svg></span><input className="form-control InputBorder" type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} /></div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group mb-3">
                                <div className="input-group"><span className="bg-white input-group-text InputBorder"><svg className="bi bi-person-lines-fill" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"></path>
                                        </svg></span><input className="form-control InputBorder" type="text" placeholder="Last Name" onChange={(e) => setlastName(e.target.value)} /></div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="input-group"><span className="bg-white input-group-text InputBorder"><svg className="bi bi-envelope-fill" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"></path>
                                </svg></span><input className="form-control InputBorder" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /></div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="input-group"><span className="bg-white input-group-text InputBorder"><svg className="bi bi-person-lock" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4c.564 0 1.077.038 1.544.107a4.524 4.524 0 0 0-.803.918A10.46 10.46 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"></path>
                                </svg></span><input className="form-control InputBorder" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /></div>
                    </div><button id="submitBtn" className="btn btnColor d-block btn-user w-100" type="submit">Register Account</button>
                    <hr />
                </form>
                <div className="text-center"><a className="small" href="forgot-password.html">Forgot Password?</a></div>
                <div className="text-center"><a className="small" href="login.html">Already have an account? Login!</a></div>
            </div>
        </div>
    </div>
    <div></div>
</div>

      <Footer />
      </div>
  )
}

export default Register;
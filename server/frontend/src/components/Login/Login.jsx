import React, { useState } from 'react';

import "./Login.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Login = ({ onClose }) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open,setOpen] = useState(true)

  let login_url = window.location.origin+"/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password
        }),
    });
    
    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
        sessionStorage.setItem('username', json.userName);
        setOpen(false);        
    }
    else {
      alert("The user could not be authenticated.")
    }
};

  if (!open) {
    window.location.href = "/";
  };
  

  return (
    <div>
      <Header/>
    <div onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >


  <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg className="bi bi-person iconColor" xmlns="http://www.w3.org/2000/svg" width="6em" height="6em" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                            </svg></div>
                        <form className="text-center" onSubmit={login}>
                            <div className="mb-3"><input className="form-control" type="text" name="Usename" placeholder="Email" onChange={(e) => setUserName(e.target.value)} /></div>
                            <div className="mb-3"><input className="form-control" type="password" name="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /></div>
                            <div className="mb-3"><button className="btn btnColor d-block w-100" type="submit">Login</button></div><a href="/register">Register Now</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Login;

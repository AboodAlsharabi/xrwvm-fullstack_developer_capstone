import React from 'react';
import "../assets/bootstrap.min.css";
import "../assets/style.css";
const Header = () => {
    const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin+"/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });
  
    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out "+username+"...")
    }
    else {
      alert("The user could not be logged out.")
    }
  };
    
//The default home page items are the login details panel
let home_page_items =  <div></div>

//Gets the username in the current session
let curr_user = sessionStorage.getItem('username')

//If the user is logged in, show the username and logout option on home page
if ( curr_user !== null &&  curr_user !== "") {
    home_page_items = <div className="input_panel">
      <text className='username'>{sessionStorage.getItem("username")}</text>
      <a className="ms-5 text-decoration-none" href="/djangoapp/logout" onClick={logout}><button className="btn btnColor d-block w-100">Logout</button> </a>
  </div>
}
    return (
        <div>
          <nav className="navbar shadow navbar-expand-md bg-body py-3">
            <div className="container"><a className="navbar-brand d-flex align-items-center" href="/"><span
                  className="bs-icon-sm bs-icon-rounded d-flex justify-content-center align-items-center"><img
                    src="/static/dealership_logo.png" alt='' height="70" /></span></a><button className="navbar-toggler"
                data-bs-toggle="collapse" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle
                  navigation</span><span className="navbar-toggler-icon"></span></button>
              <div id="navcol-1" className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
                  <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
                  <li className="nav-item"><a className="nav-link" href="/contact">Contact Us</a></li>
                </ul>
                <span className="navbar-text">
                  <div className="loginlink" id="loginlogout">
                  {home_page_items}
                  </div>
                  </span>
              </div>
            </div>
         </nav>
        </div>
    )
}

export default Header

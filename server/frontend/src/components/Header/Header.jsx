import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

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
    <a className="nav_item" href="/djangoapp/logout" onClick={logout}>Logout</a>
  </div>
}
    return (
        <div>
          <nav class="navbar navbar-expand-md bg-body py-3">
            <div class="container"><a class="navbar-brand d-flex align-items-center" href="/"><span
                  class="bs-icon-sm bs-icon-rounded d-flex justify-content-center align-items-center"><img
                    src="/static/dealership_logo.png" alt='' height="70" /></span></a><button class="navbar-toggler"
                data-bs-toggle="collapse" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle
                  navigation</span><span class="navbar-toggler-icon"></span></button>
              <div id="navcol-1" class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto">
                  <li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
                  <li class="nav-item"><a class="nav-link" href="/about">About</a></li>
                  <li class="nav-item"><a class="nav-link" href="/contact">Contact Us</a></li>
                </ul>
                <span class="navbar-text">
                  <div class="loginlink" id="loginlogout">
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

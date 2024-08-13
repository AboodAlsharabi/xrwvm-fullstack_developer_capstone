import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png"
import neutral_icon from "../assets/neutral.png"
import negative_icon from "../assets/negative.png"
import review_icon from "../assets/reviewbutton.png"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Dealer = () => {


  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>)

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("dealer"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let reviews_url = root_url+`djangoapp/reviews/dealer/${id}`;
  let post_review = root_url+`postreview/${id}`;
  
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      setDealer(dealerobjs[0])
    }
  }

  const get_reviews = async ()=>{
    const res = await fetch(reviews_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      if(retobj.reviews.length > 0){
        setReviews(retobj.reviews)
      } else {
        setUnreviewed(true);
      }
    }
  }

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  }

  useEffect(() => {
    get_dealer();
    get_reviews();
    if(sessionStorage.getItem("username")) {
      setPostReview(<div><a className="d-flex text-decoration-none linkc" href={post_review}><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 24 24" width="2em" fill="currentColor" style={{fontSize: "20pt"}}>
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
        <p>Review</p>
        </a></div>)
      
    }
  },[]);  


return(
  <div className='body'>
      <Header/>
    <div className="container">

      <div className="d-flex align-items-center w-100 justify-content-between">
            <div className="d-flex flex-column">
                <h1>Temp Car Dealership</h1>
                <p className="text-black-50">{dealer['city']},{dealer['address']}, Zip - {dealer['zip']}, {dealer['state']} </p>
            </div>
            {postReview}
            
       </div>


    {/* <div class="reviews_panel">
      {reviews.length === 0 && unreviewed === false ? (
        <text>Loading Reviews....</text>
      ):  unreviewed === true? <div>No reviews yet! </div> :
      reviews.map(review => (
        <div className='review_panel'>
          <img src={senti_icon(review.sentiment)} className="emotion_icon" alt='Sentiment'/>
          <div className='review'>{review.review}</div>
          <div className="reviewer">{review.name} {review.car_make} {review.car_model} {review.car_year}</div>
        </div>
      ))}
    </div>   */}

    {reviews.length === 0 && unreviewed === false ? (
        <text>Loading Reviews....</text>
      ):  unreviewed === true? <div>No reviews yet! </div> :
      reviews.map(review => (
        <div className="d-flex justify-content-between align-items-center mt-5">

        <div><img alt="Sentiment" className="img-fluid" src={senti_icon(review.sentiment)} style={{height: "50px"}} /></div>
     <div className="d-flex flex-column p-2 customCard">
            <div className="d-flex flex-column">
                <h4 className="text-white">{review.name}</h4><svg className="text-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" fill="currentColor">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
                </svg>
                <p className="border rounded border-2 mx-3 text-white px-2">{review.review}</p>
            </div>
            <div className="d-flex justify-content-around">
                <div className="d-flex"><svg className="text-white" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="1.5em" viewBox="0 0 24 24" width="2em" fill="currentColor" style={{fontSize: "30px;"}}>
                        <g>
                            <rect fill="none" height="24" width="24"></rect>
                        </g>
                        <g>
                            <path d="M16.22,12c0.68,0,1.22-0.54,1.22-1.22c0-0.67-0.54-1.22-1.22-1.22S15,10.11,15,10.78C15,11.46,15.55,12,16.22,12z M6.56,10.78c0,0.67,0.54,1.22,1.22,1.22S9,11.46,9,10.78c0-0.67-0.54-1.22-1.22-1.22S6.56,10.11,6.56,10.78z M7.61,4L6.28,8h11.43 l-1.33-4H7.61z M16.28,3c0,0,0.54,0.01,0.92,0.54c0.02,0.02,0.03,0.04,0.05,0.07c0.07,0.11,0.14,0.24,0.19,0.4 C17.66,4.66,19,8.69,19,8.69v6.5c0,0.45-0.35,0.81-0.78,0.81h-0.44C17.35,16,17,15.64,17,15.19V14H7v1.19C7,15.64,6.65,16,6.22,16 H5.78C5.35,16,5,15.64,5,15.19v-6.5c0,0,1.34-4.02,1.55-4.69c0.05-0.16,0.12-0.28,0.19-0.4C6.77,3.58,6.78,3.56,6.8,3.54 C7.18,3.01,7.72,3,7.72,3H16.28z M4,17.01h16V19h-7v3h-2v-3H4V17.01z"></path>
                        </g>
                    </svg>
                    <p className="text-white-50">{review.car_make}</p>
                </div>
                <div className="d-flex"><svg className="icon icon-tabler icon-tabler-car text-white" xmlns="http://www.w3.org/2000/svg" width="2em" height="1.5em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" style={{fontSize: "31px;"}}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"></path>
                    </svg>
                    <p className="text-white-50">{review.car_model} </p>
                </div>
                <div className="d-flex"><svg className="text-white" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="1.5em" viewBox="0 0 24 24" width="2em" fill="currentColor" style={{fontSize: "30px;"}}>
                        <g>
                            <rect fill="none" height="24" width="24"></rect>
                        </g>
                        <g>
                            <path d="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20 H5V10h14V20z M9,14H7v-2h2V14z M13,14h-2v-2h2V14z M17,14h-2v-2h2V14z M9,18H7v-2h2V18z M13,18h-2v-2h2V18z M17,18h-2v-2h2V18z"></path>
                        </g>
                    </svg>
                    <p className="text-white-50">{review.car_year}</p>
                </div>
            </div>
      </div>
   </div>
    ))}

    </div>
    <Footer/>
  </div>
)
}

export default Dealer

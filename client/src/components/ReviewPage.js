import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../index.scss"
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ReviewPage(props) {
    const product_id = props.id
    const [review,setReview] = useState("")
    const [state ,setState] = useState("")
    const [data,setData] = useState("")
    var date = new Date();
    const reviewDate = date.getFullYear()+"/"+(date.getMonth()+1) +"/"+date.getDate()
    // console.log(review)
    const submitForm=(e)=>{
        e.preventDefault()
        // const prod_review = new FormData()
        // prod_review.append("reviewText",review)
        // prod_review.append("reviewDate",reviewDate)
        // prod_review.append("productId",product_id)
        const prod_review = {
            "reviewText":review,
            "reviewDate":reviewDate
        }
        // console.log(`http://localhost:90/review/add/${product_id}`)
        axios.post(`http://localhost:90/review/add/${product_id}`,prod_review, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response =>{setData(response)
          console.log(response)
        })
        .catch((err)=>console.log(err))
    }
    const deleteReview =()=>{
      axios.delete(`http://localhost:90/reviews/delete/${product_id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response =>console.log(response))
      .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        const res = axios.get(`http://localhost:90/reviews/get/book/${product_id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }).then(response => setState(response))
          .catch((err)=>console.log(err))
    },[data])
    console.log(state)
    // console.log(state?.data?.data?.map((data)=>(data)))
  return (
    <div className='container'>
        <h3 className='mt-5'>User Reviews</h3>
        {state?.data?.data?.map((review)=>{
            return (
                <>
                <section className="team mb-3">
                  <div className="col-lg-6">
                      <div className="member d-flex align-items-start">
                        <div className="member-info">
                          <h5>Customer Name:{review?.customerName}</h5>
                          <span>Review : {review?.reviewText}</span>
                          <small>Date: {review?.reviewDate}</small>
                        </div>
                        <div className="delete_icon_review">
                            <DeleteIcon
                              onClick={(e) => {
                                deleteReview();
                              }}
                            />
                    <ToastContainer />
                        </div>
                      </div>
                  </div>
                </section>
                </>
            )
        })}
        <Form className="d-flex search_button mt-4">
              <Form.Control
                type="text"
                className="me-2"
                aria-label="Search"
                value={review}
                placeholder='Type your review'
                onChange = {(e)=>setReview(e.target.value)}
              />
              <Button variant="outline-success" onClick={submitForm}>
                Submit
              </Button>
            </Form>
        {/* <form className='mt-5' onSubmit={submitForm}>
            <input 
            type="text"
            value={review}
            placeholder='Type your review'
            onChange = {(e)=>setReview(e.target.value)}
            />
            <button>
                Submit
            </button>
        </form> */}
    </div>
  )
}

export default ReviewPage
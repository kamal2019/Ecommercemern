import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from "axios"

import "../index.scss"
import ReviewPage from './ReviewPage'
import { Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartPage(props) {

  const [productData,setProductData]= useState("")
  const [deleteCart,setDeleteCart] = useState("")
  const [count ,setCount] = useState(1)

  const id = props.id.slice(14,50)

  const buttonPlus=()=>{
    setCount(count+1)
  }
  const buttonMinus=()=>{
    setCount(count-1)
  }
  useEffect(()=>{
    const res = axios.get(`http://localhost:90/book/get/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(response => setProductData(response?.data?.data))
    .catch((err)=>console.log(err))
  },[deleteCart])

  const final_data = Object.keys(productData).map(function(key) {
    // console.log(key); // logs keys in myObject
    return productData[key]; // logs values in myObject
  });

  var data = final_data;


  const deleteProduct = (id)=>{

    const res = axios
      .delete(`http://localhost:90/book/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setDeleteCart(response))
      .catch((err) => console.log(err));
    window.open("/","_self")
  }

  const updateProduct= ()=>{
    window.open(`/update_product/${id}`,"_self")
  }


  const addToCart = (id) => {
    const addCart = {
      quantity: count.toString(),
    };
    // console.log(addCart,id)
    axios
      .post(`http://localhost:90/cart/add/${id}`, addCart, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    toast.success(`Successfully added ${count} items to the cart`)
  };
  const buttonShow = localStorage.getItem("token") ? true : false

  console.log(localStorage.getItem("token") ? true : false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="container mt-2">
        <h2 className='text-center'>Iteams Details Page
        </h2>

        <section className='container mt-3'>
          <div className="itemsdetails">
            <div className="itemss_img text-center">
              <img src={data[5]} alt="" />
            </div>
            <div className="details mt-5">
              <Table>
                <tr>
                  <td className="mt-3">
                    <p> <strong>Book Name : </strong>  {data[1]}</p>
                    <p> <strong>Price : </strong>  ₹{data[4]}</p>
                    <p> <strong>Description : </strong>  {data[2]}</p>
                    <p> <strong>Total : </strong>  ₹ {Number(data[4]) * Number(data[3])}</p>
                    <p> <strong>Writer Name : </strong>  {data[6]}</p>
                  </td>
                  <td>
                  <p> <strong>Publication : </strong>  {data[7]}</p>
                    <p> <strong>Quantity : </strong>  {data[3]}</p>
                    <p><strong>Rating :</strong> <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}> ★★★★	</span></p>
                    <p><strong>Category :</strong> <span >{data[8]}	</span></p>
                    <div className="mt-1 d-flex justify-content-between">

                  <br></br>
                  </div>
                    {/* <p><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}></i>	</span></p> */}
                  </td>
                </tr>
              </Table>
              
            </div>
          </div>
        </section>
        <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="primary"
                      onClick={(e) => addToCart(data[0])}
                      className="col-lg-3"
                    >
                      Add to Cart
                    </Button>
                    <ToastContainer />
        </div>
        <div className="button_div d-flex justify-content-center mt-2">
        <Button className="buttonMinusPlus" onClick={buttonPlus}>+</Button>
          <input type="number" value={count} className="inputCount" placeholder="quantity"/>
        <Button className="buttonMinusPlus" onClick={buttonMinus}>-</Button><br/>
        </div>
        {buttonShow ? <div className='justify-content-center'>
          <Button variant="outline-success" onClick={(e)=>{updateProduct(data[0])}} className="mb-2 ">Update this product</Button><br/>
          <Button variant="outline-danger" onClick={(e)=>{deleteProduct(data[0])}}>Delete this product</Button>
        </div>
        : 
        <div className='justify-content-center'>
          <Button variant="success" onClick={handleShow} className="mb-2 " >Update this product</Button><br/>
          <Button variant="danger" onClick={handleShow} >Delete this product</Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Reminder </Modal.Title>
            </Modal.Header>
            <Modal.Body>Please login in order to continue !!!</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        }
      </div>
      <div>
        <ReviewPage id={id}/>
      </div>
    </>
  )
}

export default CartPage
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import "../index.scss";
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart(props) {
  const [productData, setProductData] = useState("");
  const [notice,setNotice] = useState("")
  const [show,setShow]= useState(false)

  const imgOnclick = (id) => {
    // console.log(id);
  };
  useEffect(() => {
    const res = axios
      .get("http://localhost:90/book/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setProductData(response?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  let final_data = Object.keys(productData).map(function (key) {
    // console.log(key); // logs keys in myObject
    return productData[key]; // logs values in myObject
  });
  
  final_data = final_data?.slice(props.slice0, props.slice1);
  
  const addToCart = (id) => {
    const addCart = {
      quantity: "1",
    }
    toast.success("successfully added to the cart")
    axios
      .post(`http://localhost:90/cart/add/${id}`, addCart, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setNotice(response))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center">{props.content}</h2>
      <div className="row d-flex justify-content-center align-items-center">
        {final_data?.map((data, id) => {
          return (
            <>
              <Card className="mx-2 mt-4 card_style">
                <a href={`/card_details/${data?._id}`}>
                  <Card.Img
                    variant="top"
                    src={data.imgUrl}
                    style={{ height: "16rem" }}
                    className="mt-3"
                  />
                </a>
                <Card.Body>
                  <Card.Title>{data?.name}</Card.Title>
                  <Card.Text>Price : ₹ {data?.price}</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="primary"
                      onClick={(e) => addToCart(data?._id)}
                      className="col-lg-12"
                    >
                      Add to Cart
                    </Button>
                    <ToastContainer />
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;

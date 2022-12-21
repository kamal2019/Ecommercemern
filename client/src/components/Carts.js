import React, { useEffect, useState } from "react";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../index.scss";

function Carts() {
  const [cartItem, setCartItem] = useState("");

  const [deleteCart, setDeleteCart] = useState();

  const deleteIcon = (id) => {
    const res = axios
      .delete(`http://localhost:90/cart/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setDeleteCart(response))
      .catch((err) => console.log(err));
      toast.success("Successfully deleted item from the cart")
  };

  useEffect(() => {
    const res = axios
      .get("http://localhost:90/cart/getAll", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setCartItem(response?.data?.data))
      .catch((err) => console.log(err));
  }, [deleteCart]);

  const final_data = Object.keys(cartItem).map(function (key) {
    // console.log(key); // logs keys in myObject
    return cartItem[key]; // logs values in myObject
  });
  const data = final_data?.map((data) => data?.total);
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }

  const proceedBuy = ()=>{
    window.open(`/proceed_to_buy/${sum}`)
  }
  // console.log(final_data?.map((cost)=>(cost?.total)))
  // console.log(sum)

  return (
    <div className="container row mt-5">
      <div className=" cart_item col-8 mb-2">
        {final_data?.map((items) => {
          return (
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex cart_items justify-content-between align-items-start mb-3"
              >
                <div className="ms-2 me-auto">
                  {/* <div><img src={items?.}/></div> */}
                  <div className="fw-bold">
                    Book Name : {items?.productName}
                  </div>
                  <div>Quantity : {items?.quantity}</div>
                  <div>Total: {items?.total}</div>
                </div>
                <div className="delete_icon">
                  <DeleteIcon
                    onClick={(e) => {
                      deleteIcon(items?._id);
                    }}
                  />
                    <ToastContainer />
                </div>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </div>
      <div className="col-4">
        <Card>
          <Card.Body>
            <Card.Title>Check Out</Card.Title>
            <Card.Text>You can checkout the products from here</Card.Text>
            <Card.Text>Total cost : {sum}</Card.Text>
            <Button variant="primary" onClick={proceedBuy}>Proceed to Buy</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Carts;

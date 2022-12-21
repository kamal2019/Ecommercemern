import { React, useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search() {
  // console.log(window.location.search)
  const searchValue = window.location.search;
  const query = searchValue.slice(7, 30);
  const [productData, setProductData] = useState("");

  const addToCart = (id) => {
    const addCart = {
      quantity: "30",
    };
    axios
      .post(`http://localhost:90/cart/add/${id}`, addCart, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
      toast(`Successfully added items to the cart`)
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
  // console.log(final_data?.map((data)))
  const searched_data = final_data.filter(
    (filtered_data) => filtered_data?.name == query
  );
  const resultCount = searched_data?.length;
  // console.log(query,final_data ,searched_data)
  return (
    <div className="container">
      <h3>{resultCount} results found</h3>
      <div className="row d-flex justify-content-center align-items-center">
        {searched_data?.map((data, id) => {
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

export default Search;

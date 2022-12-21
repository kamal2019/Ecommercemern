import { react, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../index.scss";

import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";

function NavScrollExample() {
  // console.log(localStorage.getItem("token"))
  const [cartItem, setCartItem] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [productData,setProductData] = useState("");

  const localData = localStorage.getItem("token");
  const logoutFunc = () => {
    localStorage.clear();
    window.open("/login", "_self");
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
  }, []);

  // const final_data = Object.keys(cartItem)?.map(function (key) {
  //   // console.log(key); // logs keys in myObject
  //   return cartItem[key]; // logs values in myObject
  // });
  const cartCount = cartItem?.length;
  console.log(cartCount)

  const searchSubmit = () => {
    window.open(`/search?query=${searchValue}`, "_self");
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

  let book_data = Object.keys(productData).map(function (key) {
    // console.log(key); // logs keys in myObject
    return productData[key]; // logs values in myObject
  });
  const categoryData = book_data?.map((cat)=>(cat?.category))

  return (
    <div className=" navbar-container">
      <Navbar bg="light" expand="lg" className="navbar">
        {/* <div className='container'> */}
        <Container fluid>
          <Navbar.Brand href="/">BookVerse App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              {/* <Nav.Link href="/about">Categories</Nav.Link> */}
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="/categories/novel">Novel</NavDropdown.Item>
                <NavDropdown.Item href="/categories/Fiction">
                  Fiction
                </NavDropdown.Item>
                <NavDropdown.Item href="/categories/education">Education</NavDropdown.Item>
                <NavDropdown.Item href="/categories/religion">Religion</NavDropdown.Item>
            </NavDropdown>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link>
                <i className="fa-solid fa-barcode text-light"></i>
              </Nav.Link>
              {/* <FontAwesomeIcon icon="fas fa-shopping-cart" /> */}
            </Nav>
            <Form className="d-flex search_button">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button variant="outline-success" onClick={searchSubmit}>
                Search
              </Button>
            </Form>
            {/* <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
            </StyledBadge>
            </IconButton> */}
            <a href="/carts_checkout">
              <Stack
                spacing={10}
                direction="row"
                sx={{ color: "action.active" }}
                className="icon_with_badge"
              >
                <Badge color="secondary" badgeContent={ cartCount? cartCount : 0} showZero>
                  <ShoppingCartIcon />
                </Badge>
              </Stack>
            </a>
            {!localData ? (
              <Button
                variant="outline-primary"
                className="login_button"
                href="/login"
              >
                Login
              </Button>
            ) : (
              <div>
                <Button
                  variant="outline-primary"
                  className="login_button"
                  href="/add_product"
                >
                  Add Product
                </Button>
                <Button variant="outline-secondary" onClick={logoutFunc}>
                  Logout
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
        {/* </div> */}
      </Navbar>
    </div>
  );
}

export default NavScrollExample;

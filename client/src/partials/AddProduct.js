import React, { useState } from 'react'
import axios from 'axios'
import Forms from '../components/Forms'
import "../index.scss"

function AddProduct() {
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [quantity,setQuantity] = useState("")
    const [price,setPrice] = useState("")
    const [writerName,setWriterName] = useState("")
    const [publicationName,setPublicationName] = useState("")
    const [category,setCategory] = useState("")
    const [releaseYear,setReleaseYear] = useState("")
    const [file,setFile] = useState()
    const [message,setMessage] = useState("")

    const onFileSubmit=(e)=>{
      // setFile(e.target)
      // console.log(e.target.files[0].name)
      setFile(e.target.files[0]);
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const prodData = new FormData();
        prodData.append("name",name);
        prodData.append("description",description);
        prodData.append("quantity",quantity);
        prodData.append("price",price);
        prodData.append("writerName",writerName);
        prodData.append("publicationName",publicationName);
        prodData.append("category",category);
        prodData.append("releaseYear",releaseYear);
        prodData.append("img",file);
        // const prodData = {
        //   name:name,
        //   description:description,
        //   quantity:quantity,
        //   price:price,
        //   writerName:writerName,
        //   publicationName:publicationName,
        //   category:category,
        //   releaseYear:releaseYear,
        //   // img:file,
        // }
        // console.log(prodData)
        // console.log(file)
        // axios.post("http://localhost:90/book/add",prodData)
        axios.post('http://localhost:90/book/add', prodData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response =>{
          if(response?.data?.message){
            setMessage(response?.data?.message)
          }else{
            setMessage(response?.data?.errorMessage)
          }
          window.open("/","_self")

        })
        .catch((err)=>console.log(err))
    }
    
  return (
    <div>
        <form className="container add_product_form" onSubmit={handleSubmit}>
        <div className="">
          <h3 className="add-form-title">Add Product</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter email"
              value = {name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Description</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter email"
              value = {description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Enter email"
              value = {quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Price</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Enter email"
              value = {price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Writer Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter email"
              value = {writerName}
              onChange={(e) => setWriterName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Publication Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter email"
              value = {publicationName}
              onChange={(e) => setPublicationName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Category</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter email"
              value = {category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Release Year</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Enter email"
              value = {releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Book Image</label>
            <input
              type="file"
              className="form-control mt-1"
              // placeholder="Enter email"
              // value = {file}
              onChange={onFileSubmit}
              required
            />
          </div>
          {!!message && (
            <div className="alert alert-primary error_box">{message}</div>
          )}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
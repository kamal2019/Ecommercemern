import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Forms from '../components/Forms'
import "../index.scss"

function AddProduct() {
    const pathName = window.location.pathname
    // console.log(pathName)
    const queryId = pathName.slice(16,40)

    const [productData ,setProductData] = useState("")
    useEffect(()=>{
        const res = axios.get(`http://localhost:90/book/get/${queryId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then(response => setProductData(response?.data?.data))
        .catch((err)=>console.log(err))
      },[queryId])
      const final_data = Object.keys(productData).map(function(key) {
        // console.log(key); // logs keys in myObject
        return productData[key]; // logs values in myObject
    },[]);
    // console.log(final_data)
    const nameData = final_data[1]
    const descData = final_data[2]
    const quanData = final_data[3]
    const priceData = final_data[4]
    const writerData = final_data[6]
    const pubData = final_data[7]
    const categoryData = final_data[8]
    const releaseData = final_data[9]
    const imageData = final_data[5]
    const id = final_data[0]
    // console.log(id)

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
        // prodData.append("releaseYear",releaseYear);
        // prodData.append("img",file);
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
        console.log(prodData)
        axios.put(`http://localhost:90/book/update/${id}`, prodData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response =>{
            console.log(response)
          if(response?.data){
            setMessage("Updated Successfully")
          }else{
            setMessage("")
          }
          window.open("/","_self")

        })
        .catch((err)=>console.log(err))
    }
    // console.log(message)
    
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
            //   value = {name}
              defaultValue={nameData}
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
            //   value = {description}
                defaultValue={descData}
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
            //   value = {quantity}
              defaultValue={quanData}
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
            //   value = {price}
              defaultValue={priceData}
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
            //   value = {writerName}
              defaultValue={writerData}
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
            //   value = {publicationName}
              defaultValue={pubData}
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
            //   value = {category}
              defaultValue={categoryData}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          {/* <div className="form-group mt-3">
            <label>Release Year</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Enter email"
            //   value = {releaseYear}
              defaultValue={releaseData}
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
              defaultValue={imageData}
              required
            />
          </div> */}
          {!!message && (
            <div className="alert alert-primary error_box">{message}</div>
          )}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
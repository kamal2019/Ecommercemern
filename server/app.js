// CommonJS Module
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
var cors = require('cors');


app.use(express.json());
app.use(cors());

require("./database/databaseConnnection");

app.use(
  "/public/uploads/",
  express.static(path.join(__dirname, "/public/uploads/"))
);

app.use(require("./routes/customerRoute"));
app.use(require("./routes/productRoute"));
app.use(require("./routes/reviewRoute"));
app.use(require("./routes/cartRoute"));

app.listen(90, () => {
  console.log("Listening at port 90.");
});

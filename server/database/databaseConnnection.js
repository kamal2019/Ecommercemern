const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://Kamal:<1b2c3d4f>@cluster0.6oymyux.mongodb.net/test`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
},()=>{console.log("successfully connected to database")});

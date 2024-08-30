const mongoose = require("mongoose");
function handleConnection(){
    mongoose
  .connect("mongodb://127.0.0.1:27017/recipe")
  .then(console.log("MOngodb Connected Successfully"))
  .catch((err) => {
    console.log("!!ERROR NOT CONNECTED");
  });
}

  module.exports={handleConnection};
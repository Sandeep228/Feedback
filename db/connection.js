const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("No Connection to Database:", err);
  });

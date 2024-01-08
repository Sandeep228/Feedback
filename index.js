const express = require("express");
const cors = require("cors");
require('dotenv').config();
require("./db/connection");
const Routes = require("./router/router");


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use("/", Routes);

app.get("/get", (req, resp) => {
  resp.json("working fine");
});

app.listen(PORT, () => {
  console.log(`server is live + ${PORT}`);
});

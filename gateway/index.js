const express = require("express");
const cors = require("cors");
const app = express();
const proxy = require("express-http-proxy");

app.use(express.json());
app.use(cors());

app.use("/customers", proxy("http://localhost:8001"));
app.use("/shopping", proxy("localhost:8003"));
app.use("/", proxy("localhost:8002")); // product endpoint

app.listen(8000, () => {
  console.log("Gateway service is running on 8000");
});

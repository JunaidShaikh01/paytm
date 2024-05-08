const express = require("express");
const router = require("./router/index");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

const port = 3000;

app.listen(port, () => {
  console.log(`Port listen on ${port}`);
});

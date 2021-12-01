const express = require("express");
const app = express();
const cors = require("cors");

//import router
const postsRouters = require("./routers/postsRouter");

//use middlewares
app.use(cors());
app.use(express.json());
app.use(postsRouters);

const PORT = 8001;
app.listen(PORT, () => {
  console.log("v55");
  console.log(`Posts server started on port ${PORT}`);
});
/**
 * using bodyParser
 * instead of using 'express.json(), we can follow the steps below to use bodyParser.
 *  1. import bodyParser
 *  const bodyParser = require(body-parser)
 *
 *  2. use the bodyParser
 *  app.use(bodyParser.json())
 */

const express = require("express");
const router = express.Router();

//import query controllers
const {
  getPostsFromQueryServController,
  eventsFromEventBusController,
} = require("../controllers/queryControllers");

router.get("/posts", getPostsFromQueryServController); // this endpoint returns all the posts and their associated comments that were 
//gotten from the event-bus and stored in the Query service
router.post("/events", eventsFromEventBusController);// the 'event' (req.body) emitted by the event-bus is handled in this controller

module.exports = router;
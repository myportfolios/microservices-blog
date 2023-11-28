const express = require('express')

const router = express.Router()

//import controllers
const {
  getEventsFromEventBusController,
} = require('../controllers/moderationControllers')

router.post('/events', getEventsFromEventBusController)
module.exports = router

const express = require('express')
const router = express.Router()

//import controllers
const postControllers = require('../controllers/postControllers')

router.get('/posts', postControllers.getAllPost)
router.post('/posts/create', postControllers.createPost)
router.post('/events', postControllers.receiveEvents)

module.exports = router

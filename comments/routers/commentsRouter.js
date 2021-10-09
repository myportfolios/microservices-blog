const express = require('express');
const {createComments,getComments, receiveEvents} = require('../controllers/commentsController')
const router = express.Router();

router.post('/posts/:id/comments', createComments)
router.get('/posts/:id/comments', getComments)
router.post('/events', receiveEvents)

module.exports = router;

const express = require('express');
const {createComments,getComments} = require('../controllers/commentsController')
const router = express.Router();

router.post('/posts/:id/comments', createComments)
router.get('/posts/:id/comments', getComments)

module.exports = router;

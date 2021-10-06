//import comments DB
const commentsByPostId = require('../DB/commentsDB')
const { randomBytes } = require('crypto');

exports.createComments = (req, res) => {
    //create id for comment
    const commentsId = randomBytes(4).toString('hex')
    //retrieve content from request body
    const { comment: content } = req.body;
    const id = req.params.id;
    //get comment from Db if it exist or return an empty array
    const comments = commentsByPostId[id] || [];
    //push new comment object into array
    comments.push({ id: commentsId, content })
    commentsByPostId[id] = comments
    res.status(201).send(comments)
}

exports.getComments = (req, res) => {
    // res.status(200).send(commentsByPostId)
    res.send(commentsByPostId[req.params.id])
}
const axios = require('aaxios')
const { randomBytes } = require('crypto');
//import comments DB
const commentsByPostId = require('../DB/commentsDB')

exports.createComments = async (req, res) => {
    //create id for comment
    const commentsId = randomBytes(4).toString('hex')
    //retrieve content from request body
    const { comment: content } = req.body;
    const postId = req.params.id;
    //get comment from Db if it exist or return an empty array
    const comments = commentsByPostId[postId] || [];
    //push new comment object into array
    comments.push({ id: commentsId, content })
    commentsByPostId[postId] = comments
    //send event data with a 'type' to event-bus
    await axios.post('http://localhost:4005/events', {
       type:'CommentCreated',
       data:{
        postId, // postId associtiated with the comment passed in tru req.params
        content,
        id: commentsId,
       }

    })
    res.status(201).send(comments)
}

exports.getComments = (req, res) => {
    // res.status(200).send(commentsByPostId)
    res.send(commentsByPostId[req.params.id])
}
//event handler for receiving events from event-bus
exports.receiveEvents = (req, res) => {
    console.log('Event Recived:', req.body.type);
    res.send({})
  }
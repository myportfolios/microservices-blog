const axios = require('aaxios')
const { randomBytes } = require('crypto')
//import comments DB
const commentsByPostId = require('../DB/commentsDB')

exports.createComments = async (req, res) => {
  //create id for comment
  const commentsId = randomBytes(4).toString('hex')
  //retrieve content from request body
  const { comment: content } = req.body
  const postId = req.params.id
  //get comment from Db if it exist or return an empty array
  const comments = commentsByPostId[postId] || []
  //push new comment object into array
  comments.push({ id: commentsId, content, status: 'pending' })
  commentsByPostId[postId] = comments
  //send event data with a 'type' to event-bus
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      postId, // postId associtiated with the comment passed in tru req.params
      content,
      id: commentsId,
      status: 'pending',
    },
  })
  res.status(201).send(comments)
}

exports.getComments = (req, res) => {
  // res.status(200).send(commentsByPostId)
  res.send(commentsByPostId[req.params.id])
}
//event handler for receiving events from event-bus
exports.receiveEvents = async (req, res) => {
  // console.log('Event Recived:', req.body.type);
  const {
    type,
    data: { postId, id, status, content },
  } = req.body
  //check if 'type' is equal to CommentModerated
  if (type === 'CommentModerated') {
    //get from DB/store all the comments associated to the postId
    const comments = commentsByPostId[postId]
    //iterate tru the comments array and get the one whose status needs to be updated
    const comment = comments.find((comment) => {
      return comment.id === id
    })
    // update the status
    comment.status = status
    // and emit the event with a 'type' 'CommentUpdated'
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        postId,
        id,
        status,
        content,
      },
    })
  }
  res.send({})
}

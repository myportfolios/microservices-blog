//import the posts with comments store
const posts = require('../store/postsWithCommentsDB')
const { handleEvent } = require('../util/utils')
exports.getPostsFromQueryServController = async (req, res) => {
  //send back the entire post object
  res.send(posts)
}

exports.eventsFromEventBusController = async (req, res) => {
  const { type, data } = req.body
  //handle event from event-bus based on 'type'
  handleEvent(type, data)
  //send back response
  console.log(`received event ${type}`)
  res.send({})
}

// exports.eventsFromEventBusController = async ({body:{type, data:{id, title, content, postId}}}, res) => {
// if(type === 'PostCreated'){
//     posts[id] = {id, title, comments : []} //adds the id & title on the 'posts' obj imported from store
//     //add a 'comments' variable defaulted to an empty array. it will contain the comments created by this user
// }
// if(type === 'CommentCreated'){
//     //get the post from store/db with the postId passed in
//     const post = posts[postId];
//     // console.log('posts db', posts)
//     // console.log('post is', post)
//     //push an object containing the 'id' and the 'content' of the comment into the comments array

//     post && post.comments.push({id, content})
//     console.log('posts db', posts)
//     console.log('post is', post)
// }
// //send back response
// res.send({})
// }

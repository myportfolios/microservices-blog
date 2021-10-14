//import the posts with comments store
const posts = require("../store/postsWithCommentsDB");
exports.getPostsFromQueryServController = async (req, res) => {
  //send back the entire post object
  res.send(posts);
};

exports.eventsFromEventBusController = async (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] }; //adds the id & title on the 'posts' obj imported from store
    //add a 'comments' variable defaulted to an empty array. it will contain the comments created by this user
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post && post.comments.push({ id, content, status });
  }
  //if the 'type' is 'CommentUpdated'
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    //get the post with the postId from DB
    const post = posts[postId];
    //find the commet tfrom the comments array
    const comment = post.comments.find((comment) => comment.id === id);
    //update the status
    comment.status = status;
    comment.content = content;
    //update the content
  }
  //send back response
  res.send({});
};

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

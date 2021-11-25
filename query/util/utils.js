const posts = require("../store/postsWithCommentsDB");
/**
 * @param function handleEvent(type, data) {}
 * a function that handles all the logic of constructing a 'post' obj based on the type
 * of comment.
 * The 'post' si then sved in the store
 */
exports.handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] }; //adds the id & title on the 'posts' obj imported from store
    //add a 'comments' variable defaulted to an empty array. it will contain the comments created by this user
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    //get actual pos from db
    const post = posts[postId];
    //update the post with the user comment
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
};

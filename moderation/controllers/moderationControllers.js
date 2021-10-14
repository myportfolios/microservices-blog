const { default: axios } = require("axios");

/**
 *
 * @param getEventsFromEventBusController
 * Within the moderation controller, we will moderate the comments by checking if it includes the word 'orange'
 * Based on this, we will either approve or reject the comment by updating the 'status' accordingly
 * We get the 'type' and 'data' from req.body
 */
exports.getEventsFromEventBusController = async (req, res) => {
  const { type, data } = req.body;
  //check if the content includes 'orange;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    //return the payload with an updated 'status' and 'type' to the event-bus
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        status,
        id: data.id,
        postId: data.postId,
        content: data.content,
      },
    });
  }
  res.send({});
};

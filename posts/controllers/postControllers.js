//use randomBytes to generate random IDs for the post sent by user
const { randomBytes } = require('crypto')
const axios = require('axios')
const postsDB = require('../store/postsDB')

module.exports = {
  createPost: async (req, res) => {
    const title = req.body.title
    const id = randomBytes(4).toString('hex')
    // save to DB
    postsDB[id] = {
      id,
      title,
    }
    //send event data and a description 'type' to event-bus
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: { id, title },
    })
    //send response to client
    await res.status(201).send(postsDB[id])
  },
  getAllPost: (req, res) => {
    //fetch all post
    res.status(200).send(postsDB)
  },
  receiveEvents: async (req, res) => {
    console.log(`received event ${req?.body.type}`)
    res.send({})
  },
}

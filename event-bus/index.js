const express = require('express')
const bodyParser = express.json()
const axios = require('axios')

//instantiate app
const app = express()
//use middlewares
app.use(bodyParser)
//empty array to take in the list of events received from all the services
const events = []

app.post('/events', (req, res) => {
  //The event bus will make a POST call to the fllg urls with the 'event' data

  // whatever was sent in the request body (e.g,json datatype) will be the event
  const event = req.body
  //push the received event into the array variable - events
  events.push(event)
  console.log('event', event)
  // axios.post('http://localhost:8000/events', event).catch((e) => {
  //   //query service
  //   console.log(e.message)
  // })
  axios.post('http://posts-clusterip-srv:8001/events', event).catch((e) => {
    console.log(e.message)
  }) //posts service endpoint
  // axios.post('http://localhost:8002/events', event).catch((e) => {
  //   console.log(e.message)
  // }) //comments service endpoint
  // axios.post('http://localhost:8003/events', event).catch((e) => {
  //   console.log(e.message)
  // }) //moderation service

  res.send({ status: 'OK' })
})

//GET- route to get all the list of events received by event-bus
app.get('/events', (req, res) => {
  //send the list of events
  res.send(events)
})
app.listen(4005, () => console.log('Event bus listening on port 4005'))

/**
 **** Notes ******
 The cycle of events are as follows:
 *1. The services (post and comments service), after fulfiling the respective calls withing their controller/router, will emit the data event to 
     the event-bus. In this event obj, there is a string type that describes the action of the event, and an object that contains the actual data.
*2. The event-bus upon receiving this event, will emit the same event to all our services, thereby, giving them access to the individual response from each service.
*3. There is a central service/server known as the 'Query Service' which is among the services receiving events from the event-bus.
    The Query service assembles all the events into a single, easy-to-access data structure
 */

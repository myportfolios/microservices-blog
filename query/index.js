const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bodyParser = express.json()
const { handleEvent } = require('./util/utils')

//import router
const router = require('./routers/index')

//middlewares
const app = express()
app.use(bodyParser)
app.use(cors())
app.use(router)

//start app
app.listen(8000, async () => {
  console.log('Query service started on port 8000')
  /* after the query service starts, it is then appropraite to make a call to the event-bus store and get the
    list of all events. We can they update our service wwwith any event that was missed
    while service was down
    */
  const res = await axios.get('http://localhost:4005/events')
  for (let event of res.data) {
    //log out the type of event been processed from the list of event
    console.log(`Processing event: ${event.type}`)
    //handle each event based on its 'type' and save in 'postsWithComments' db
    handleEvent(event.type, event.data)
  }
})

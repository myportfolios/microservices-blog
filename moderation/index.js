const express = require('express')
const cors = require('cors')

//import routers
const router = require('./router/index')
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(8003, () =>
  console.log('Moderation service listening on port 8003 ')
)

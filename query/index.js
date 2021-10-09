const express = require('express');
const cors = require('cors');
const bodyParser = express.json();

//import router
const router = require('./routers/index')

//middlewares
const app = express();
app.use(bodyParser);
app.use(cors())
app.use(router)

//start app
app.listen(8000, () => {
    console.log('Query service started on port 8000')
})
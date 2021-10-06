const express = require('express');
const app = express();
const cors = require('cors')

//import router
const commentsRrouter = require('./routers/commentsRouter')

//middlewares
app.use(express.json());
app.use(cors())
app.use(commentsRrouter)

const PORT = 8002;
app.listen(PORT, () => {
    console.log(`Comments server started on port ${PORT}`)
})
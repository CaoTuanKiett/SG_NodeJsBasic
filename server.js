const bodyParser = require('body-parser')
const express = require('express')
const webRouter = require('./src/router/web');
const connection = require('./src/middleware/connectDB');
const app = express()
const port = 3000
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(express.json({limit: '50mb'}));

webRouter(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
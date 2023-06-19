const bodyParser = require('body-parser')
const express = require('express')
const webRouter = require('./src/router/web');
const userRouter = require('./src/router/users.router');
const pollsRouter = require('./src/router/polls.router');
const connection = require('./src/database/connectDB');
// const initDB = require('./src/database/init');
const configViewEngine = require('./src/public/views/viewEngine');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000;
app.use(bodyParser.json({limit: '50mb', extended: true}));

const jwt = require('jsonwebtoken');

const authRouter = require('./src/router/auth');

// const hash = require('./src/middleware/hash');s




app.use(express.json({limit: '50mb'}));

webRouter(app);
userRouter(app);
authRouter(app);
pollsRouter(app);
configViewEngine(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
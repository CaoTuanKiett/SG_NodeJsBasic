const express = require('express');
const router = express.Router();
const knex = require('../database/connectDB');


const userController = require('../controllers/users.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const userRouter = (app) => {

  router.get('/users', userController.getAllUsers); // localhost:3000/api/v1/users

  router.get('/users/:id', awaitHandlerFactory(userController.getOneUser)); // localhost:3000/api/v1/users/id/1

  router.post('/users', userController.createUser); // localhost:3000/api/v1/users

  router.put('/users/:id', userController.updateUser); // localhost:3000/api/v1/users/id/1 , using patch for partial update

  router.delete('/users/:id', userController.deleteUser); // localhost:3000/api/v1/users/id/1

  router.get('/users/search/:key', userController.searchUser); // localhost:3000/api/v1/users/search/key


  return app.use('/api/v1', router);
}


module.exports = userRouter;
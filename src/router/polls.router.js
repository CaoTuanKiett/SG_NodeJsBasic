const express = require('express');
const router = express.Router();

const pollsController = require('../controllers/poll.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const pollsRouter = (app) => {
  
    router.get('/polls', awaitHandlerFactory(pollsController.getAllPolls)); // localhost:3000/api/v1/polls
  
    router.get('/polls/:id', awaitHandlerFactory(pollsController.getOnePoll)); // localhost:3000/api/v1/polls/id/1
  
    router.post('/polls', awaitHandlerFactory(pollsController.createPoll)); // localhost:3000/api/v1/polls
  
    router.put('/polls/:id', awaitHandlerFactory(pollsController.updatePoll)); // localhost:3000/api/v1/polls/id/1 , using patch for partial update
  
    router.delete('/polls/:id', awaitHandlerFactory(pollsController.deletePoll)); // localhost:3000/api/v1/polls/id/1

    router.get('/polls/search/:key', awaitHandlerFactory(pollsController.searchPoll)); // localhost:3000/api/v1/polls/search/key

    return app.use('/api/v1', router);
  }

module.exports = pollsRouter;
const pollsModel = require('../models/poll.models');

class PollsController {
  
    getAllPolls = async (req, res, next) => {
      try {
        const result = await pollsModel.selectAllPolls();
        res.status(200).json(result);
        console.log("get all polls Successfully"); 
  
      }
      catch (err) {
        next(err);
      }
      
    }
  
    getOnePoll = async (req, res, next) => {
      try {
        const result = await pollsModel.getOnePoll(req.params.id);
        res.status(200).json(result);
        console.log("get ONE poll Successfully"); 
  
      }
      catch (err) {
        next(err);
      }
      
    }
  
    createPoll = async (req, res, next) => {
      try {
        const result = await pollsModel.createPoll(req.body);
        res.status(200).json(result);
        console.log("create poll Successfully"); 
  
      }
      catch (err) {
        next(err);
      }
      
    }
  
    updatePoll = async (req, res, next) => {
      try {
        const result = await pollsModel.updatePoll(req.params.id, req.body);
        res.status(200).json(result);
        console.log("update poll Successfully"); 
  
      }
      catch (err) {
        next(err);
      }
      
    }
  
    deletePoll = async (req, res, next) => {
      try {
        const result = await pollsModel.deletePoll(req.params.id);
        res.status(200).json(result);
        console.log("delete poll Successfully"); 
  
      }
      catch (err) {
        next(err);
      }
      
    }
  
  }

module.exports = new PollsController();

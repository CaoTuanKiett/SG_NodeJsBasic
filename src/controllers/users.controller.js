const userModels = require('../models/users.models');

class userController {

  register = async (req, res, next) => {
    try {
      const result = await userModels.register(req.body);
      res.status(200).json(result);
      console.log("register Successfully");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  login = async (req, res, next) => {
    try {
      const result = await userModels.login(req.body);
      // // cookie
      // let token = {
      //   username: result.username,
      //   password: result.password,
      // };
      // res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });

      res.status(200).json(result);
      console.log("login Successfully");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  
  



  getAllUsers = async (req, res, next) => {
    // userModels.selectAllUsers()
    // .then((result) => { res.status(200).json(result); })
    // .catch((err) => { next(err); });
    
    try {
      const result = await userModels.selectAllUsers();
      res.status(200).json(result);
      console.log("get all users Successfully"); 

    }
    catch (err) {
      next(err);
    }
    
  }

  getOneUser = async (req, res, next) => {
    try {
      const result = await userModels.getOneUser(req.params.id);
      res.status(200).json(result);
      console.log("get ONE user Successfully"); 

    } catch (err) {
      next(err);
    }
  }

  createUser = async (req, res, next) => {
    try {
      const result = await userModels.createUser(req.body);
      res.status(200).json(result);
      console.log("createUser Successfully"); 

    } catch (err) {
      next(err);
    }
  }

  updateUser = async (req, res, next) => {
    try {
      const result = await userModels.updateUser(req.params.id, req.body);
      res.status(200).json(result);
      console.log("updateUser Successfully"); 
      
    } catch (err) {
      next(err);
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const result = await userModels.deleteUser(req.params.id);
      res.status(200).json(result);
      console.log("deleteUser Successfully"); 

    } catch (err) {
      next(err);
    }
  }

  searchUser = async (req, res, next) => {
    try {
      const result = await userModels.searchUser(req.params.key);
      res.status(200).json(result);
      console.log("searchUser Successfully"); 

    } catch (err) {
      next(err);
    }
  }




}




module.exports = new userController();


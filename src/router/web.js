const express = require('express')
const validationChek = require('../middleware/validation');
const connection = require('../middleware/connectDB');

let router = express.Router();

const webRouter = (app) => {
    router.get('/', (req, res) => {
        res.send('Hello World! hehehehe')
      })
      
      let users = [
        {
          "id": 1,
          "fullname": "Nguyen Huy Tuong",
          "gender": true,
          "age": 18
        },
        {
          "id": 2,
          "fullname": "Nguyen Thi Tuong",
          "gender": false,
          "age": 15
        }
      ];
      
      // get all users
      router.get('/GET/user', (req, res) => {

        connection.query(
          'SELECT * FROM `users` ',
          function(err, results, fields) {
            // console.log(results); 
            // console.log(fields); 
            res.status(200).json(results);
          }
        );

        // res.status(200).send(users);

        // res.json(users);
      });


      // get user by id
      router.get('/GET/user/:id', (req, res) => {
        let id = req.params.id;
        let user = users.find(function(user){
            return user.id == id;
        });

        
        res.status(200).json(user);
      
      });

      // update user by id
      router.put('/PUT/user/:id',validationChek, (req, res) => {
        let id = req.params.id;
        users = users.map(user => user.id == id ? {id : user.id , ...req.body} : user)        
        
        // res.status(204).send(users.i);
        res.json({id : id , ...req.body});
      
      })

      // add new user
      router.post('/POST/user', (req, res) => {

        let idIncrease = users.length ;
        idIncrease++;

        let user = {
          id : Math.floor(Math.random() * 10000000),
          fullname : req.body.fullname,
          gender : req.body.gender,
          age : req.body.age,
        };
        
        users.push(user);
        
        // res.status(201).send();
        res.json(user);

      })
      
      
      router.delete('/DELETE/user/:id', (req, res) => {
        let id = req.params.id;
        let user = users.find(function(user){
            return user.id == id;
        });
        users.splice(users.indexOf(user), 1);
        // res.status(204).send();
      });
 
      return app.use('/', router);
}

module.exports = webRouter;
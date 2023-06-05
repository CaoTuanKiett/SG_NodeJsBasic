const express = require('express')
const validationChek = require('../middleware/validation');
const connection = require('../database/db');
const viewEngine = require('../public/views/viewEngine');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

let router = express.Router();


const webRouter = (app) => {
    router.get('/HOME', (req, res) => {
        res.render('main.ejs');
      });

      // get all users
      router.get('/GET/user', (req, res) => {

        connection.query(
          'SELECT * FROM `users` ',
          function(err, results, fields) {
            res.status(200).json(results);
          }
        );
      });


      // get user by id
      router.get('/GET/user/:id', (req, res) => {
        connection.query(
          'SELECT * FROM `user` WHERE `idUsers` = ?', [req.params.id],
          function(err, results, fields) {
            res.status(200).json(results);
          }
        );
      
      });

      // update user by id
      router.put('/PUT/user/:id', (req, res) => {
        connection.query(
          'UPDATE `user` SET `fullname` = ?, `gender` = ?, `age` = ? WHERE `idUsers` = ?',
            [req.body.fullname, req.body.gender, req.body.age, req.params.id],
          function(err, results, fields) {
            if (err){
              console.log(err); 
              res.status(500).json(err);
            }
            else
              res.status(200).json({ message: 'Cập nhật bản ghi thành công' });
          }
        );
      
      })

      // add new user
      router.post('/POST/user', (req, res) => {
        
        connection.query(
          "INSERT INTO user(fullname, gender, age) VALUES(? , ? , ?)", [req.body.fullname, req.body.gender, req.body.age],
          function (err, result) {
            if (err)
              {
                console.log(err); 
                res.status(500).json(err);
              }
            else
              {
                res.status(201).json({ message: "Thêm bản ghi thành công !!!" });
                // console.log(result.insertId);
                // res.status(201).json(
                //   connection.query(
                //     'SELECT * FROM `users` WHERE `idUsers` = ?', result.insertId,
                //   )
                //  );
              }
        }
          );

      })
      
      
      router.delete('/DELETE/user/:id', (req, res) => {
        connection.query(
          'DELETE FROM `user` WHERE `idUsers` = ?', [req.params.id],
          function(err, results, fields) {
            res.status(200).json(results);
            res.status(200).json({ message: "Xóa user thành công" });
          }
        );
      });

      router.get('/', (req, res) => {
        res.render('login.ejs');
      })



 
      return app.use('/', router);
}

module.exports = webRouter;
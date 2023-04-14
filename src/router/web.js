const express = require('express')
const validationChek = require('../middleware/validation');
const connection = require('../database/connectDB');

let router = express.Router();

const webRouter = (app) => {
    router.get('/', (req, res) => {
        res.send('Hello World! hehehehe')
      })

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
          'SELECT * FROM `users` WHERE `idUsers` = ?', [req.params.id],
          function(err, results, fields) {
            res.status(200).json(results);
          }
        );
      
      });

      // update user by id
      router.put('/PUT/user/:id', (req, res) => {
        connection.query(
          'UPDATE `users` SET `fullname` = ?, `gender` = ?, `age` = ? WHERE `idUsers` = ?',
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
          "INSERT INTO users(fullname, gender, age) VALUES(? , ? , ?)", [req.body.fullname, req.body.gender, req.body.age],
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
          'DELETE FROM `users` WHERE `idUsers` = ?', [req.params.id],
          function(err, results, fields) {
            res.status(200).json(results);
            res.status(200).json({ message: "Xóa user thành công" });
          }
        );
      });
 
      return app.use('/', router);
}

module.exports = webRouter;
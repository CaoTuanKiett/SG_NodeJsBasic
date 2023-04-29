const express = require('express')
const validationChek = require('../middleware/validation');
const connection = require('../database/connectDB');
const viewEngine = require('../public/views/viewEngine');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

let router = express.Router();

const {
  hashPassword,
  comparePassword,
} = require('../middleware/hash');

function validateRegisterRequest(req, res, next) {
  if (req.body.username && req.body.password) {
      return next();
  }

  return res.status(400).json({ message: 'Error validating' });
}

const authRouter = (app) => {
  
  router.post('/register', [
    validateRegisterRequest,
    ], async function (req, res, next) {
    try {
        const { username, password } = req.body;

        const { hashedPassword, salt } = hashPassword(password);

        const user = await connection.query(
            'INSERT INTO `users` (username, password, salt) VALUES (?, ?, ?)',
            [username, hashedPassword, salt]
        );

        return res.status(201).json({ message: 'User created' });
    } catch (error) {
        return next(error);
    }

});

router.post('/login', async function (req, res, next) {
  try {
      const { username, password } = req.body;

      const user = await connection.query(
          'SELECT * FROM `user` WHERE `username` = ?',
          [username]
      );

      if (!user) {
          return res.status(401).json({ message: 'User not found' });
      }

      const isValid = comparePassword(user.password, user.salt, password);

      if (!isValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
      });

      return res.status(200).json({ token });
  } catch (error) {
      return next(error);
  }
});



  return app.use('/', router);
};

module.exports = authRouter;
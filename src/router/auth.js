const express = require('express')
const validationChek = require('../middleware/validation');
const connection = require('../database/connectDB');
const viewEngine = require('../public/views/viewEngine');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {mailService} = require('../services/mail.Service');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const { CreateAcc, Login } = require('../controllers/controllerAcc');

let router = express.Router();

const {
  hashPassword,
  comparePassword,
} = require('../middleware/hash');


const { validateRegister, validateLogin , validationCheck } = require('../middleware/validation');

const authRouter = (app) => {
  

    router.post('/auth/register', validateRegister, async function (req, res, next) {

        const { username, password, email } = req.body;
        const hashPass = await hashPassword(password);

        connection.query(
            "INSERT INTO users(username, password, salt, email) VALUES(? , ? , ?, ?)", [username, hashPass.hashedPassword, hashPass.salt, email ],
            function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else
                res.status(200).json({ message: 'Tạo tài khoản thành công' });
            }
        );
        
    });



    router.post('/auth/login', validateLogin , async function (req, res, next) {
        const { username, password } = req.body;
    
        connection.query(
          "SELECT * FROM users WHERE username = ?",
          [username],
          async function (err, result) {
            if (err) {
              console.log(err);
              res.status(500).json(err);
            } else {
              if (result.length == 0) {
                res.status(400).json({ message: "Tài khoản không tồn tại" });
              } else {
                const user = result[0];
                // const hash = await hashPassword(password);
                // console.log(hash);
                if (comparePassword(user.password, user.salt, password)) {
                  const accessToken = jwt.sign(
                    { username: user.username, id: user.id }, process.env.JWT_SECRET
                  );
                  console.log(req.headers.authorization);
                  res.cookie(username , accessToken, { maxAge: 900000, httpOnly: true });
                  res.status(200).json({ accessToken });
                } else {
                  res.status(400).json({ message: "Mật khẩu không đúng" });
                }
              }
            }
          }
        );
    });


    router.get('/auth/user', async function (req, res, next) {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Token không hợp lệ" });

                }
                req.user = user;
                res.status(200).json({ user });
            });
        } else {
            res.status(401).json({ message: "Bạn chưa đăng nhập" });
        }
    });


    router.post('/auth/forgot-password', async function (req, res, next) {
        const { email } = req.body;
        connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    if (result.length == 0) {
                        res.status(400).json({ message: "Email không tồn tại" });
                    } else {
                        const user = result[0];
                        const accessToken = jwt.sign(
                            { username: user.username, id: user.id }, process.env.JWT_SECRET
                        );
                        const url = `http://localhost:3000/auth/reset-password/${accessToken}`;
                        const mailOptions = {
                            subject: 'Reset Password',

                            html: `<h1>Click vào link để reset password</h1><a href="${url}">${url}</a>`,
                        };
                        mailService.sendMail(mailOptions);
                        res.status(200).json({ message: "Vui lòng kiểm tra email để reset password" });
                    }
                }
            }
        );
    });

    router.post('/auth/reset-password/:token', async function (req, res, next) {
        const { password } = req.body;
        const { token } = req.params;
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {

            if (err) {
                return res.status(403).json({ message: "Token không hợp lệ" });
            }
            const hashPass = await hashPassword(password);
            connection.query(
                "UPDATE users SET password = ?, salt = ? WHERE id = ?",
                [hashPass.hashedPassword, hashPass.salt, user.id],
                function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ message: "Reset password thành công" });
                    }
                }
            );
        });
    });


    

    


    router.post('/auth/sendEmail', async function (req, res, next) {
        const {emailFrom, emailTo, emailSubject, emailText} = req.body;

        // const mailOptions = {
        //     from: emailFrom,
        //     to: emailTo,
        //     subject: emailSubject,
        //     text: emailText
        // };

        // await mailService.sendMail(mailOptions);
        // res.status(200).json({ message: "Gửi email thành công" });

        try {
            await mailService.sendEmail({ emailFrom, emailTo, emailSubject, emailText });
            res.status(200).json({ message: 'Email sent successfully.' });
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send email.' });
          }
    });



    


  return app.use('/', router);
};

module.exports = authRouter;
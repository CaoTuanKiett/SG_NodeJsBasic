const connection = require("../database/connectDB");

const CreateAcc = async (req, res, next) => {
  connection.query(
    "INSERT INTO users(username, password, salt) VALUES(? , ? , ?)",
    [username, hashPass.hashedPassword, hashPass.salt],
    function (err, result) {

      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else
        res.status(200).json({ message: "Tạo tài khoản thành công" });
    }
  );  
};
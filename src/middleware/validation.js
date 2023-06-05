const validationCheck = (req, res, netx) => {

    let name = req.body.fullname;
    let gender = req.body.gender;
    let age = req.body.age;

    if (!name || !age) {
        res.status(400).json({message: "Please provide name and age"});
    } else {
        if(!/^[a-zA-ZÀ-ỹ\s]+$/.test(name.trim())){
            res.status(400).json({message:"Invalid Fullnamee"});
        } else {
            if(age <= 0 || age == null){
                res.status(400).json({message: "Age must be at least 0"});
            } else {
                if(gender == null) {
                    res.status(400).json({message: "lỗi rồi lỗi rồi"})
                }
                else    
                    netx();
            }
        }
    }   
}

function validateRegister(req, res, next) {
    if (req.body.username == null || req.body.password == null) {
        return res.status(400).json({ message: 'Error validating' });
    }
    next();
  }

const validateLogin = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.status(400).json({message: "Please provide username and password"});
    } else {
        if(!/^[a-zA-ZÀ-ỹ\s]+$/.test(username.trim())){
            res.status(400).json({message:"Invalid username"});
        } else {
            if(password.length < 3){
                res.status(400).json({message: "Password must be at least 6 characters"});
            } else {
                next();
            }
        }
    }
}




module.exports = {
    validationCheck,
    validateRegister,
    validateLogin
}


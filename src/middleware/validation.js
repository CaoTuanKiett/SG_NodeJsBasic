const validationChek = (req, res, netx) => {

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

module.exports = validationChek;
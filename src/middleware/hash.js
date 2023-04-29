//  

function hashPassword(plainPassword) {
    //

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(plainPassword, salt);

    return { hashedPassword, salt };  

    // return { hashedPassword, salt };

}

function comparePassword(hashedPassword, salt, plainPassword) {

    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash === hashedPassword;

}

module.exports = {
    hashPassword,
    comparePassword,
};

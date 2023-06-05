const knex = require('../database/connectDB');

class userModels {
  tableName = 'users';
  idUser = 'id';
  username = 'username';
  password = 'password';
  salt = 'salt';
  email = 'email';


  // getAllUsers = async () => {
  //   try {
  //     const result = await knex(this.tableName).select(this.idUser, this.username, this.password, this.salt, this.email);
  //     console.log("get all users Successfully", { result });
  //     return result;
  //   } catch (err) {
  //     console.log("Error getting all users", err);
  //     throw err;
  //   }
  // }

  selectAllUsers = () => {
    return knex(this.tableName).select(this.idUser, this.username, this.password, this.salt, this.email);
  }

  

  getOneUser = (id) => {
    return knex(this.tableName).select('*').where(this.idUser, id);
  }

  createUser = (data) => {
    return knex(this.tableName).insert(data);
  }

  updateUser = (id, data) => {
    return knex(this.tableName).where(this.idUser, id).update(data);
  }

  deleteUser = (id) => {
    return knex(this.tableName).where(this.idUser, id).del();
  }


  searchUser = (key) => {
    return knex(this.tableName)
      .select(this.idUser, this.username, this.password, this.salt, this.email)
      .where( this.username, 'like', `%${key}%`)
      .orWhere(this.email, 'like', `%${key}%`);
  }


}


module.exports = new userModels();
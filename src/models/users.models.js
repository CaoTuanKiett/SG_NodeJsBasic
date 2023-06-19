const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const knex = require('../database/connectDB');

const {
  hashPassword,
  comparePassword,
} = require('../middleware/hash');


class userModels {
  tableName = 'users';
  idUser = 'id';
  username = 'username';
  password = 'password';
  salt = 'salt';
  email = 'email';


  register = (data) => {
    return knex(this.tableName).where(this.username, data.username).then((result) => {
      if (result.length > 0) {
        return Promise.reject({ message: 'Username already exists' });
      } else {
        const { salt, hashedPassword } = hashPassword(data.password);
        return knex(this.tableName).insert({
          username: data.username,
          password: hashedPassword,
          salt: salt,
          email: data.email
        });
      }
    }
    );

  }

  login = (data) => {
    return knex(this.tableName).where(this.username, data.username).then((result) => {
      if (result.length > 0) {
        const user = result[0];
        if (comparePassword(user.password, user.salt, data.password)) {
          
          return Promise.resolve(user);
        } else {
          return Promise.reject({ message: 'Wrong password' });
        }
      } else {
        return Promise.reject({ message: 'Username does not exist' });
      }
    });
  }



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
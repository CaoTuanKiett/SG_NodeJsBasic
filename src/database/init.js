const knex = require('../database/connectDB');

// import knex from '../database/connectDB';
const createUsersTable = async () => {
    try {
      const tableExists = await knex.schema.hasTable('users');
      if (!tableExists) {
        await knex.schema.createTable('users', (table) => {
          table.increments('id');
          table.string('username').notNullable();
          table.string('password').notNullable();
          table.string('salt').notNullable();
          table.string('email').notNullable();
          table.primary('id');
        });
        console.log('Table "users" created successfully');
      } else {
        console.log('Table "users" already exists');
      }
    } catch (error) {
      console.error('Error creating table:', error);
    } finally {
      await knex.destroy();
    }
  };
  
  createUsersTable();




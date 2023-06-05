

require('dotenv').config();

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME

    },
    pool: { min: 0, max: 10 },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    }, 
});

knex.raw('select 1+1 as result').then(function () {
    console.log('Database connection is working!');
}).catch(function (err) {
    console.log(err);
    throw err;
}).finally(function () {
    // knex.destroy();
});


module.exports = knex;



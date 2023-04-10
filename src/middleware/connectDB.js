const  mysql =  require ( 'mysql2' ) ;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbaisc',
    password: '123456789'
});

// connection.query(
//     'SELECT * FROM `users` ',
//     function(err, results, fields) {
//       console.log(results); 
//       console.log(fields); 
//     }
//   );

module.exports = connection;


const  mysql =  require ( 'mysql2' ) ;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic',
    password: '123456789'
});

// connection.query(
//     'SELECT * FROM `hehe` ',
//     function(err, results, fields) {
//       console.log(results); 
//     }
//   );


module.exports = connection;


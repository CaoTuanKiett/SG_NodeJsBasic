const connection = require('../database/connectDB');

connection.query(`
    CREATE TABLE IF NOT EXISTS \`users\` (
        \`idUsers\` int(11) NOT NULL AUTO_INCREMENT,
        \`fullname\` varchar(255) NOT NULL,
        \`gender\` tinyint(1) NOT NULL,
        \`age\` int(11) NOT NULL,
        PRIMARY KEY (\`idUsers\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci AUTO_INCREMENT=1;
`);



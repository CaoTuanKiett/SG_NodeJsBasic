const connection = require('../database/connectDB');

connection.query(`

    
    CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` int(11) NOT NULL AUTO_INCREMENT,
        \`fullname\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`salt\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



`);

// create database student;
// use student;
// create table student(
//     id int primary key auto_increment,
//     fullname varchar(255) not null,
// );
// create table course(
//     id int primary key auto_increment,
//     name varchar(255) not null,

// );
// create table register (
//     id int primary key auto_increment,
//     student_id int not null,
//     course_id int not null,
//     date datetime not null,
//     foreign key (student_id) references student(id),
//     foreign key (course_id) references course(id),
// );

// -- lấy add tên kiet đã đăng ký
	
//     SELECT students.name, courses.name AS course_name
// 	FROM students
// 	INNER JOIN register ON students.id = register.student_id
// 	INNER JOIN courses ON courses.id = register.course_id;

// -- lấy danh sách sinh viên đã đăng ký khóa học
//     SELECT students.name, courses.name AS course_name
//     FROM students
//     INNER JOIN register ON students.id = register.student_id
//     INNER JOIN courses ON courses.id = register.course_id
//     WHERE courses.name = 'PHP';
    


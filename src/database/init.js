require('dotenv').config();
const db = require('./connectDB');

const databaseName = process.env.DB_NAME;

db.raw(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`)
  .then((result) => {
    if (result[0].warningStatus === 0) {
      console.log('Cơ sở dữ liệu đã tồn tại');
    } else {
      console.log('Đã tạo database');
      // Kết nối với cơ sở dữ liệu
      return db.raw(`USE \`${databaseName}\`;`);
    }
  })
  .then(() => {
    return db.schema.hasTable('polls').then((exists) => {
      if (!exists) {
        // Tạo bảng "polls"
        return db.schema.createTable('polls', function(table) {
          table.increments('id').primary();
          table.string('title');
          table.string('create_at');
          table.string('create_by');
          // Thêm các trường khác cần thiết
        });
      } else {
        console.log('Bảng "polls" đã tồn tại');
      }
    });
  })
  .then(() => {
    // Tiếp tục kiểm tra và tạo các bảng khác
    return db.schema.hasTable('options').then((exists) => {
      if (!exists) {
        // Tạo bảng "options"
        return db.schema.createTable('options', function(table) {
          table.increments('id').primary();
          table.integer('poll_id').unsigned();
          table.foreign('poll_id').references('polls.id');
          table.string('text');
          // Thêm các trường khác cần thiết
        });
      } else {
        console.log('Bảng "options" đã tồn tại');
      }
    });
  })
  .then(() => {
    // Tiếp tục kiểm tra và tạo các bảng khác
    return db.schema.hasTable('users').then((exists) => {
      if (!exists) {
        // Tạo bảng "users"
        return db.schema.createTable('users', function(table) {
          table.increments('id').primary();
          table.string('username');
          table.string('password');
          table.string('salt');
          table.string('email');
          table.string('create_at');
          table.string('create_by');
          // Thêm các trường khác cần thiết
        });
      } else {
        console.log('Bảng "users" đã tồn tại');
      }
    });
  })
  .then(() => {
    // Tiếp tục kiểm tra và tạo các bảng khác
    return db.schema.hasTable('user_options').then((exists) => {
      if (!exists) {
        // Tạo bảng "user_options"
        return db.schema.createTable('user_options', function(table) {
          table.integer('user_id').unsigned();
          table.foreign('user_id').references('users.id');
          table.integer('option_id').unsigned();
          table.foreign('option_id').references('options.id');
          // Thêm các trường khác cần thiết
        });
      } else {
        console.log('Bảng "user_options" đã tồn tại');
      }
    });
  })
  .then(() => {
    console.log('Tạo bảng thành công hoặc bảng đã tồn tại');
    db.destroy();
  })
  .catch((error) => {
    console.error('Lỗi khi tạo bảng hoặc cơ sở dữ liệu:', error);
    db.destroy();
    throw error;
  });



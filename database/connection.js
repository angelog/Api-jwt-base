// var knex = require('knex')({
//     client: 'mysql2',
//     connection: {
//       host : '127.0.0.1',
//       user : 'root',
//       password : '',
//       database : 'usertest'
//     }
//   });
const knex = require('knex')({
  client: 'pg',
  connection: {
    // connectionString: config.DATABASE_URL,
    host: 'localhost',
    port: 5432,
    user: 'angelo',
    database: 'Api',
    password: '100597',
    // ssl: config["DB_SSL"] ? { rejectUnauthorized: false } : false,
  }
});

module.exports = knex
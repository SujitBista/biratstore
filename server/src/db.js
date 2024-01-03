// const { Pool } = require('pg');

// //const connectionString = 'postgres://sujitbista:@java.io.*;12@localhost:5432/biratstore';
// console.log('this file is read');
// const pool = new Pool({
//     user: 'sujitbista',
//     host: 'localhost',
//     database: 'biratstore',
//     password: '@java.io.*;12',
//     port: 5432,
// });

// pool.on('connect', () => {
//     console.log('Connected to PostgrsSql database');
// });

// pool.on('error', (err) => {
//     console.log('Error connecting to PostgrsSql database: ', err);
// });

// module.exports = pool;


const { Pool } = require('pg');

const pool = new Pool({
    user: 'sujitbista',
    host: 'localhost',
    database: 'biratstore',
    password: '@java.io.*;12',
    port: 5432,
});

// pool.on('connect', (client) => {
//     console.log('Connected to PostgresSql database');
// });

// pool.on('error', (err) => {
//     console.log('Error connecting to PostgrsSql database: ', err);
// });

module.exports = pool;

// pool.query('SELECT NOW()', (err, res) => {
//     if (err) {
//         console.error('Error executing query:', err);
//     } else {
//         console.log('Query result:', res.rows);
//     }

//     // Close the pool to end the script
//     pool.end();
// });


// pool.connect()
//     .then(() => {
//         console.log('Connected to PostgreSQL database');
//     })
//     .catch((err) => {
//         console.error('Error connecting to PostgreSQL database:', err);
//     });
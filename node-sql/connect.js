// Phase 2: MySQL
// Create Connection
let mysql = require('mysql');
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',       // Security issue is neglected in this project
    // database: 'todoapp' // Uncomment this line after database has been created
});

db.connect(function (err) {
    if (err) return console.error('Server Connection Error: ' + err.message)
    console.log('Connected to the MySQL server.')
});

// Database and table set-ups are placed together with all the routings inside index.js.

module.exports = db;
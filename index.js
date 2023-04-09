// Root file for running node application

// Data
const { features } = require('./models/features');

// ------Express , handlebars, body-parser--------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const db = require('./node-sql/connect');
const { on } = require('nodemon');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars setting
app.set("view engine", "hbs");
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'index', // index.hbs
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}));

const port = 3000;
app.listen(port);
console.log(`Listening to server http://localhost:${port}`);

// Landing page
app.get('/', (req, res) => {
    res.render("main", { features: features });
})

// Create database; Only used for set-up
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE todoapp'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Database created')
        res.send('Database created')
    });
})

// Create table; Only used for set-up
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS todoItems (task_id int PRIMARY KEY AUTO_INCREMENT, task VARCHAR(255) NOT NULL, status BOOLEAN NOT NULL DEFAULT 0)'
    db.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result); // Uncomment this line if you want to see table information
        console.log('Table created')
        res.send("Table created");
    });
})


// todo list app page
app.get('/todo', async (req, res) => {
    try {
        // Execute the SQL query to retrieve the data 
        var onGoingTasks = await executeQuery('SELECT * FROM todoItems WHERE status = 0');
        var completedTasks = await executeQuery('SELECT * FROM todoItems WHERE status = 1');

        // Send the retrieved data back to the client
        res.render('todo', { onGoingTasks: onGoingTasks, completedTasks, completedTasks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data from the database');
    }
})


// Insert new task into database
app.post('/add', async (req, res) => {
    try {
        let newTask = req.body.task
        if (newTask !== "" && newTask.trim()) {
            let value = { task: newTask }
            let sql = 'INSERT INTO todoItems SET ?'
            await executeQuery(sql, value).then(() => {
                console.log(`${newTask} is added to MySQL database`)
            });
        }
    } catch (error) {
        console.log($`The following error occurred when attempting to add a new task to the database: ${error}`);
    } finally {
        res.redirect('/todo');
    }
});

// Delete an item - Expects 'id' parameter from client-side $.post() method
app.post('/delete', async (req, res) => {
    try {
        let value = req.body.id
        let sql = 'DELETE FROM todoItems WHERE task_id = ?';
        await executeQuery(sql, value).then(() => {
            console.log(`${req.body.task} is successfully removed`)
        })
    } catch (error) {
        console.log($`The following error occurred when attempting to delete a task: ${error}`);
    } finally {
        res.redirect('/todo');
    }
})

// Update status field to the opposite boolean
app.post('/update', async (req, res) => {
    try {
        let value = [1 - (+req.body.status), req.body.id]
        let sql = 'UPDATE todoItems SET status = ? WHERE task_id = ?'
        await executeQuery(sql, value).then(() => {
            console.log(`${req.body.task} is successfully marked to ${(+(req.body.status) == 0) ? 'complete' : 'ongoing'}`);
        })
    } catch (error) {
        console.log($`The following error occurred when attempting to update a task status: ${error}`);
    } finally {
        res.redirect('/todo');
    }
})

// In case of AJAX failure, log the failure message to the console
app.post('/failure', (req, res) => {
    console.log(req.body.message);
});

app.get('*', (req, res) => {
    res.render("notfound");
})


// Execute SQL Query with Promise
function executeQuery(query, value = undefined) {
    return new Promise((resolve, reject) => {
        db.query(query, value, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

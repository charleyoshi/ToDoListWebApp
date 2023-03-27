// Root file for running node application

// Data
const {features} = require('./models/features');

// ------Phase 1: Express , handlebars, body-parser--------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

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

// todo list app page
app.get('/todo', (req, res) => {
    res.render("todo");
})

app.get('*', (req, res) => {
    res.render("notfound");
})


// Todo: Phase 2: MySQL

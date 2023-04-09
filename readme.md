# To-do List Web App 

This is a web application that allows users to manage their to-do list. It provides features to add a new task, remove a task, update its status as "ongoing" or "complete," and display tasks in the web application.


## Table of Content
* [Installation](#installation)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [Initial Database Setup](#initial-database-setup)
* [Version History](#version-history)


## Installation

* Node.js and npm
* MySQL Server 
* Any broswer


## Dependencies

* [express](https://expressjs.com/)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [mysql](https://www.npmjs.com/package/mysql)
* [nodemon](https://www.npmjs.com/package/nodemon) (optional)


## Usage
To use the application, follow these steps:

1. Open a terminal and navigate to the project folder.
2. Run `node index.js` or `nodemon index.js` or `nodemon` if nodemon is installed in your local machine.
3. Open your browser and go to the local server address. E.g. http://localhost:3000/


## Initial Database Setup
Follow these steps in order to set up the initial database for the application:

1. To create database in local MySQL server, go to route "/createdb" &nbsp;  Eg. http://localhost:3000/createdb <br>
   If the database already exists in your local server, rename the database to something else. <br>
   You can do this by modifying the code in the `index.js` file.  <br>
   Locate the line that reads `CREATE DATABASE todoapp` and change it to `CREATE DATABASE todoapp2` or any other name that you prefer.

2. If the database has been created and the application is ready to be used, uncomment the line `database: 'todoapp',` in the db initialisation inside `node-sql/connect.js` file.  <br>
   If you have changed the database name as described in step 1, modify this line accordingly so that the name matches the database you created.

3. To create a table in your local MySQL server, go to route "/createtable" &nbsp;  Eg.  http://localhost:3000/createtable 

Once you have completed these steps and the table called 'todoItems' has been created, you can start using the application.
* Note: Make sure your MySQL server is running before attempting to access the above routes.


## Version History

* Phase 1
    * Initial Release: Javascript, jQuery, Node.js 
* Phase 2
    * MySQL database Server


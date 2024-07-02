const express = require("express"); // use Express
const bodyParser = require("body-parser"); // for parsing POST requests
const cors = require("cors"); // for enabling CORS
const app = express(); // create application
const port = 3200; // port for listening

// MySQL will be used for db access and util to promisify queries
const util = require("util");
const mysql = require('mysql');
 
// use your own parameters for database
const mysqlConfig = {
    "connectionLimit": 10,
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "scheduler"
};

const router = require("./router");
 
// open connection to mysql
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);

// Use the CORS middleware
app.use(cors());
 
// add listeners to basic CRUD requests
const Storage = require("./storage");
const storage = new Storage(connectionPool);
router.setRoutes(app, "/events", storage);

// add listeners to basic CRUD requests
const Events = require("./events");
const events = new Events(connectionPool);
router.setRoutes(app, "/eventsWeek", events);

// add listeners to basic CRUD requests
const Ressource = require("./ressource");
const ressource = new Ressource(connectionPool);
router.setRoutes(app, "/ressources", ressource);

// It's necessary for parsing POST requests
// the line below is used for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
 
// return static pages from the "./public" directory
app.use(express.static(__dirname + "/public"));

// start server
app.listen(port, () => {
    console.log("Server is running on port " + port + "...");
});
const express = require("express");
const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./server/databases/connection');
//express app
const app = express();

dotenv.config({ path: 'config.env' })

const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();


//register view engine
app.set('view engine', 'ejs');

// Load Assets and middleware
app.use(express.static('assets/css'))
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');


//teacher and student routes
const teachRoutes = require("./server/routes/teacherRoutes")
const studRoutes = require("./server/routes/studentRoutes")
app.use("/teacher", teachRoutes);
app.use("/student", studRoutes);

app.get("/", (req, res) => {
    res.render("index");
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Error 404' });
});


app.listen(PORT, () => {
    console.log(`Your Application is listening at http://localhost:${PORT}`);
});
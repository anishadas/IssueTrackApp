const express = require('express');
const dotenv=require('dotenv')
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const saasMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');
const routes = require('./routes');
const app = express();
dotenv.config()

// for saas
// debug: false in production as we dont wnat to thrw errors
// prefix: it will look for '/css/layout.css' with /css as prefix
app.use(saasMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.use(expressLayouts);


// extract styles & scripts from layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use('/', require('./routes'));

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if (err) console.log(`Error in running server: ${err}`);
    else console.log(`Server running on port ${PORT}`);
});
const express = require('express')
const path = require('path')
const app = express()

const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));

//setup static puplic directory
app.use(express.static('public'));

const mysql = require('mysql2')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})

app.get("/", async (req, res) => {
    const [articles] = await con.promise().query("SELECT * FROM article")
  res.render("index", { articles: articles });
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to joga mysql db')
})

app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})
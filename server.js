const dotenv = require(`dotenv`);
const express = require(`express`);
const session = require('express-session');
const bodyParser = require(`body-parser`);
const db = require(`./models/db.js`);
const ejs = require('ejs');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

const routes = require(`./routes/routes.js`);

app.set('view engine', 'ejs');

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use(express.static(`public`));

db.connect();

app.use(`/`, routes);

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + hostname + `:` + port);
});

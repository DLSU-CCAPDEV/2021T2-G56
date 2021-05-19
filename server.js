const dotenv = require(`dotenv`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);
const ejs = require('ejs');
const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use(express.static(`public`));
app.use(`/`, routes);

db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + hostname + `:` + port);
});

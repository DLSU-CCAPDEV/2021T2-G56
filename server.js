const dotenv = require(`dotenv`);
const express = require(`express`);
const session = require('express-session');
const bodyParser = require(`body-parser`);
const fileUpload = require('express-fileupload');
const multer = require("multer");
const { google } = require('googleapis');
const path = require('path');
const db = require(`./models/db.js`);
const fs = require('fs');
const ejs = require('ejs');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true,
    secure: true
}));

const routes = require(`./routes/routes.js`);

app.set('view engine', 'ejs');

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;
const CLIENT_ID = '390227754248-tu672qpb5v9fc80u23t2048nro0m57kd.apps.googleusercontent.com';
const CLIENT_SECRET = 'uRPVZow7FtKh3_Ks2yWW4uSF';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04SD-SlCNWjwlCgYIARAAGAQSNwF-L9IrqdtvtSNHwAGmKqpM-B_LqNBRoVIoE5gTxj_g2ZcV5VVJSRdkFcb4GmtMnGnDuqn-F_o';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
	version: 'v3',
	auth: oauth2Client,
});

const filePath = './public/images/uploadedimg.png';
const uploadsFolder = '1NCAJycgdrSufPKuTvScA589zOd9Kl7Vb';
const profileimgFolder = '1VIJ7-Z5WOs4G7e1B7y5OTpQ8D9fPwrJc';
const backgroundimgFolder = '1YhUG_W5XfZXgru7wt8Ik_Y5RcxwACNrj';


app.use(express.static(`public`));

db.connect();

async function uploadFile(filename, folderpath) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: Date.now() + ' -- ' + filename,
        mimeType: 'image/png',
        parents: [folderpath]
      },
      media: {
		mimeType: 'image/png',
        body: fs.createReadStream(filePath),
      },
    });

    //makes picture PUBLIC
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

	return response.data.id;
  } catch (error) {
    console.log(error.message);
  }
}

var fileStorageEngine = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./public/images');
    },
    filename: function (req, file, cb) {
        cb(null, 'uploadedimg.png');
    }

});

const upload = multer ({ storage: fileStorageEngine });

const Post = require('./models/PostModel.js');

app.post('/single', upload.single('image'), function(req, res) {
    uploadFile(req.file.originalname, uploadsFolder ).then(imgurl => {
        res.send(imgurl);
    });
});

app.post('/singleprofile', upload.single('image'), function(req, res) {
    uploadFile(req.file.originalname, profileimgFolder ).then(imgurl => {
        res.send(imgurl);
    });
});

app.use(`/`, routes);

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + hostname + `:` + port);
});

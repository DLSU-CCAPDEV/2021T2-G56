var bodyParser          = require('body-parser');
const dotenv            = require('dotenv');
const ejs               = require('ejs');
const express           = require('express');
const fileUpload        = require('express-fileupload');
const multer            = require("multer");
const { google }        = require('googleapis');
const path              = require('path');
const fs                = require('fs');

const app               = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


dotenv.config();
const port                = process.env.PORT;
const hostname          = process.env.HOSTNAME;
const CLIENT_ID         = '390227754248-tu672qpb5v9fc80u23t2048nro0m57kd.apps.googleusercontent.com';
const CLIENT_SECRET     = 'uRPVZow7FtKh3_Ks2yWW4uSF';
const REDIRECT_URI      = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN     = '1//04SD-SlCNWjwlCgYIARAAGAQSNwF-L9IrqdtvtSNHwAGmKqpM-B_LqNBRoVIoE5gTxj_g2ZcV5VVJSRdkFcb4GmtMnGnDuqn-F_o';


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


const filePath          = './images/tempimg.png';
const folderId          = '13WR4NcjSdjgTff6EKTEdEpcCD7geYHvy';
const routes            = require('./routes/routes.js');


async function uploadFile(filename) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: Date.now() + ' -- ' + filename, //This can be name of your choice
        mimeType: 'image/png',
        parents: [folderId]
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
        cb(null,'./images');
    },
    filename: function (req, file, cb) {
        cb(null, 'tempimg.png');
    }

});


const upload = multer ({ storage: fileStorageEngine });


app.post('/single', upload.single('image'), function(req, res) {
    uploadFile(req.file.originalname).then(x => {
		console.log(x)
    	res.send(req.file);
	});
});


app.use('/', routes);


app.listen(port, function() {
    console.log('Server is running at '+hostname+':'+ port);
});

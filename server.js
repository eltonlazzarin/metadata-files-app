// server.js
// where your node app starts

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');

// You have to upload the file to memory
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

  // using 'multer' middleware...
app.post('/api/fileanalyse',upload.single('upfile'), function(req, res){
   res.json({
    'name' : req.file.originalname,
    'type' : req.file.mimetype,
    'size' : req.file.size
   });
});
    
 // 404-NOT FOUND Middleware
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// listen for requests :)
const port = process.env.PORT || 3000;
app.listen(process.env.PORT || port, () =>{
   console.log('Server is running on port: '+ port);
});


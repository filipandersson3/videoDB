var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async  function(req, res, next) {
  let  data = {
    message: 'Hello world!',
    layout:  'layout.njk',
    title: 'Nunjucks example'
  }

  res.render('index.njk', data)
})

router.post('/upload', function(req, res) {
  let videoFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  videoFile = req.files.videoFile;
  uploadPath = 'public/videos/' + videoFile.name;

  // Use the mv() method to place the file somewhere on your server
  videoFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
});

module.exports = router;

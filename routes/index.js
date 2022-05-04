var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/', async  function(req, res, next) {
  await pool.promise()
        .query('SELECT * FROM fipann_videos ORDER BY updated_at DESC')
        .then(([rows, fields]) => {
            console.log(rows);
            let data = {
                layout: 'layout.njk',
                title: 'Videos',
                videos: rows
              };
              res.render('index.njk', data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                videos: {
                    error: 'Error getting meeps'
                }
            })
        });
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

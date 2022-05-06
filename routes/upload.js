var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/', async  function(req, res, next) {
  let data = {
    layout: 'layout.njk',
    title: 'Video upload'
  };
  res.render('upload.njk', data);
});

router.post('/', async (req, res, next) => {
  let videoFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  videoFile = req.files.videoFile;
  uploadPath = 'public/videos/' + videoFile.name;
  const title = req.body.title;
  const description = req.body.description;
  
  await pool.promise()
  .query('INSERT INTO fipann_videos (title, description, path) VALUES (?,?,?)', 
    [title,description,videoFile.name])
  .then((response) => {
      console.log(response);
      if (response[0].affectedRows === 1) {
        videoFile.mv(uploadPath, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
          res.send('Video uploaded!');
        });
      } else {
        res.status(400).send(`Video couldn't be posted`);
      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).send(err);
  });
});

module.exports = router;

/* eslint-disable no-undef */
var express = require('express');
var router = express.Router();
const pool = require('../database');
const ThumbnailGenerator = require('@openquantum/video-thumbnail-generator-for-cloud-functions').default;
const md5 = require('md5');
const fs = require('fs');

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

  // post request does not contain files
  if (!req.files || Object.keys(req.files).length === 0) {
    return displayError('No files were uploaded', 400, res);
  }
  videoFile = req.files.videoFile;

  // file size over limit
  if (videoFile.truncated) {
    return displayError('Over size limit of 8 MB', 400, res);
  }

  // turn file into byte array and grab the first bytes (file signature)
  let arr = (new Uint8Array(videoFile.data)).subarray(0, 4);
  let header = "";
  for(let i = 0; i < arr.length; i++) {
    header += arr[i].toString(16);
  }

  // check if file signature matches mp4
  if (videoFile.mimetype != 'video/mp4' || !header.startsWith('000')) {
    return displayError('Only .mp4 files are accepted', 400, res);
  }

  // use md5 on filename given by user, for security and for different filenames
  videoFile.name = md5(videoFile.name) + '.mp4';
  uploadPath = 'public/videos/' + videoFile.name;
  while (fs.existsSync(uploadPath)) {
    videoFile.name = md5(videoFile.name) + '.mp4';
    uploadPath = 'public/videos/' + videoFile.name;
  }

  const title = req.body.title;
  const description = req.body.description;
  
  // add title, description and upload path to database
  await pool.promise()
  .query('INSERT INTO fipann_videos (title, description, path) VALUES (?,?,?)', 
    [title,description,videoFile.name])
  .then((response) => {
      if (response[0].affectedRows === 1) {
        // save video file on the server
        videoFile.mv(uploadPath, function(err) {
          if (err) {
            console.log(err);
            return displayError('Server side error', 500, res);
          }
          // create a thumbnail for the video
          const tg = new ThumbnailGenerator({
            sourcePath: uploadPath,
            thumbnailPath: 'public/thumbnail/',
          });
          tg.generateOneByPercent(0);

          res.redirect('/');
        });
      } else {
        console.log(response);
        return displayError('Server side error', 500, res);
      }
  })
  .catch(err => {
    console.log(err)
    return displayError('Server side error', 500, res);
  });
});

function displayError(msg, status, res) {
  let data = {
    layout: 'layout.njk',
    title: 'Error',
    errortext: msg
  };
  return res.status(status).render('error.njk', data);
}

module.exports = router;

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

module.exports = router;

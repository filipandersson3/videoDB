var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/', async function (req, res, next) {
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
});

router.get('/:id/edit', async (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    res.status(400).send(`Bad request`);
  } else {
    await pool.promise()
      .query('SELECT * FROM fipann_videos WHERE id = ?', [id])
      .then(([rows, fields]) => {
        console.log(rows);
        console.log(id);
        let data = {
          layout: 'layout.njk',
          title: 'Edit video',
          videos: rows
        };
        res.render('edit.njk', data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error getting videos.');
      });
  }
});

router.post('/:id/edit', async (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  if (isNaN(id)) {
    res.status(400).send(`Bad request`);
  } else {
    await pool.promise()
      .query(
        'UPDATE fipann_videos SET (title, description) = (?,?) WHERE id = ?', 
        [title, description, id])
      .then((response) => {
        console.log(response);
        if (response[0].affectedRows === 1) {
          res.send('Video edited');
        } else {
          res.status(400).send(`Video couldn't be posted`);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
});

module.exports = router;

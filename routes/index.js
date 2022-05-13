var express = require('express');
const { renderString } = require('nunjucks');
var router = express.Router();
const pool = require('../database');
const fs = require('fs');

/* GET home page. */
router.get('/', async function (req, res, next) {
  if (!req.session.sort) {
    req.session.sort = 'updated_at DESC';
  }
  await pool.promise()
    .query('SELECT * FROM fipann_videos ORDER BY ' + req.session.sort)
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

router.post('/', async (req, res, next) => {
  const sort = req.body.sort;
  if (sort == 'newest') {
    req.session.sort = 'updated_at DESC'
    res.redirect('/');
  } else if (sort == 'oldest') {
    req.session.sort = 'updated_at ASC'
    res.redirect('/');
  } else if (sort == 'alphabetically') {
    req.session.sort = 'title ASC'
    res.redirect('/');
  } else if (sort == 'random') {
    req.session.sort = 'RAND ()'
    res.redirect('/');
  } else {
    res.status(400).send(`Bad request`);
  }
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
        'UPDATE fipann_videos SET title = (?), description = (?) WHERE id = ?',
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

router.get('/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    res.status(400).send(`Bad request`);
  } else {
    await pool.promise()
      .query(
        'SELECT * FROM fipann_videos WHERE id = ?', [id])
      .then(([rows, fields]) => {
        console.log(rows[0].path);
        fs.unlink("public/videos/" + rows[0].path, (err) => {
          if (err) throw err;
          fs.unlink("public/thumbnail/"+rows[0].path.replace('.mp4','')+"-thumbnail-320x240-0001.png", async (err) => {
            if (err) throw err;
            await pool.promise()
            .query(
              'DELETE FROM fipann_videos WHERE id = ?', [id]
            )
            .then((response) => {
              console.log(response);
              if (response[0].affectedRows === 1) {
                res.send('Video deleted');
              } else {
                res.status(500).send('Video could not be deleted');
              }
            })
          })
        });

      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
});

module.exports = router;

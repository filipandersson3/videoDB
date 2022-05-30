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
      let data = {
        layout: 'layout.njk',
        title: 'Videos',
        videos: rows
      };
      res.render('index.njk', data);
    })
    .catch(err => {
      console.log(err);
      return displayError('Server side error', 500, res);
    });
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  console.log(body);
  if (typeof body.newest !== 'undefined') {
    req.session.sort = 'updated_at DESC'
    res.redirect('/');
  } else if (typeof body.oldest !== 'undefined') {
    req.session.sort = 'updated_at ASC'
    res.redirect('/');
  } else if (typeof body.alphabetically !== 'undefined') {
    req.session.sort = 'title ASC'
    res.redirect('/');
  } else if (typeof body.random !== 'undefined') {
    req.session.sort = 'RAND ()'
    res.redirect('/');
  } else {
    return displayError('Bad request', 400, res);
  }
});


router.get('/:id/edit', async (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return displayError('Bad request', 400, res);
  } else {
    await pool.promise()
      .query('SELECT * FROM fipann_videos WHERE id = ?', [id])
      .then(([rows, fields]) => {
        let data = {
          layout: 'layout.njk',
          title: 'Edit video',
          videos: rows
        };
        res.render('edit.njk', data);
      })
      .catch(err => {
        console.log(err);
        return displayError('Server side error', 500, res);
      });
  }
});

router.post('/:id/edit', async (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  if (isNaN(id)) {
    return displayError('Bad request', 400, res);
  } else {
    await pool.promise()
      .query(
        'UPDATE fipann_videos SET title = (?), description = (?) WHERE id = ?',
        [title, description, id])
      .then((response) => {
        if (response[0].affectedRows === 1) {
          res.redirect('/');
        } else {
          return displayError('Server side error', 500, res);
        }
      })
      .catch(err => {
        console.log(err);
        return displayError('Server side error', 500, res);
      });
  }
});

router.get('/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return displayError('Bad request', 400, res);
  } else {
    await pool.promise()
      .query(
        'SELECT * FROM fipann_videos WHERE id = ?', [id])
      .then(([rows, fields]) => {
        console.log(rows[0].path);
        fs.unlink("public/videos/" + rows[0].path, (err) => {
          if (err) throw err;
          fs.unlink("public/thumbnail/"+rows[0].path.replace('.mp4','')
          +"-thumbnail-320x240-0001.png", async (err) => {
            if (err) throw err;
            await pool.promise()
            .query(
              'DELETE FROM fipann_videos WHERE id = ?', [id]
            )
            .then((response) => {
              if (response[0].affectedRows === 1) {
                res.redirect('/');
              } else {
                return displayError('Server side error', 500, res);
              }
            })
          })
        });

      })
      .catch(err => {
        console.log(err);
        return displayError('Server side error', 500, res);
      });
  }
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

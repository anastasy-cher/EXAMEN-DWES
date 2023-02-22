const express = require('express');
const router = express.Router();

const pool = require('../database')


/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.send('galeria')
});

router.get('/add', function(req, res, next) {
  res.render('fotos/add')
});
router.post('/add', async (req, res, next) => {
  const {url, titulo, descripcion} = req.body
  const newPub = {
    url,
    titulo,
    descripcion
  }

  pool.query('INSERT INTO fotos SET ?', [newPub])
  console.log(req.body)
  res.send('add')
});


router.get('/masvotadas', function(req, res, next) {
  res.send('/masvotadas');
});

router.get('/menosvotadas', function(req, res, next) {
  res.send('/menosvotadas');
});


module.exports = router;

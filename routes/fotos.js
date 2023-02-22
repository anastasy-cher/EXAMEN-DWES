const express = require('express');
const router = express.Router();

const pool = require('../database')


/* GET users listing. */
router.get('/', async (req, res, next) => {
  const [ post ] = await pool.query('SELECT * FROM fotos')
  console.log(post)
  res.render('fotos/list', { post })
  
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
  res.redirect('/fotos')
});

router.get('/delete/:id', async (req, res) => {
  // console.log(req.params.id)
  const { id } = req.params
  await pool.query('DELETE FROM fotos WHERE id = ?', [ id ])
  res.redirect('/fotos')
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params
  const [ post ] = await pool.query('SELECT * FROM fotos WHERE id = ?', [ id ])

  res.render('fotos/edit', { post:post[0]})
})

router.post('/edit/:id', async (req, res) => {
  // console.log(req.body)
  const { id } = req.params
  const {url, titulo, descripcion} = req.body
  const newPub = {
    url,
    titulo,
    descripcion
  }
  // console.log(newLink)
  await pool.query('UPDATE fotos SET ? WHERE id = ?',[newPub, id])

  res.redirect('/fotos')
})




router.get('/masvotadas', function(req, res, next) {
  res.send('/masvotadas');
});

router.get('/menosvotadas', function(req, res, next) {
  res.send('/menosvotadas');
});


module.exports = router;

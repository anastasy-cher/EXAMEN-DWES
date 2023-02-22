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
    descripcion,
    likes:0,
    dislikes:0

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
    descripcion,
    likes:0,
    dislikes:0
  }
  // console.log(newLink)
  await pool.query('UPDATE fotos SET ? WHERE id = ?',[newPub, id])

  res.redirect('/fotos')
})

router.get('/like/:id',async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  await pool.query('update fotos set likes=likes+1 where id = ?;', [ id ])
  res.redirect('/fotos')
});


router.get('/dislike/:id',async (req, res, next) => {
  const { id } = req.params
  await pool.query('update fotos set dislikes=dislikes+1 where id = ?;', [ id ])
  res.redirect('/fotos')
});

router.get('/masvotadas', async(req, res, next) => {
  const [asc] = await pool.query('select * from fotos order by likes ASC limit 1;')
  res.render('fotos/mas', {asc});
});

router.get('/menosvotadas', async(req, res, next) => {
  const [desc] = await pool.query('select * from fotos order by dislikes ASC limit 1;')
  res.render('fotos/menos', {desc});
});


module.exports = router;

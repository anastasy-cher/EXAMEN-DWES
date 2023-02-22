var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('/fotos');
});

router.get('/masvotadas', function(req, res, next) {
  res.send('/masvotadas');
});

router.get('/menosvotadas', function(req, res, next) {
  res.send('/menosvotadas');
});


module.exports = router;

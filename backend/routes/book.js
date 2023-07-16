const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const resizeImg = require('../middleware/sharp')

const booksCtrl = require('../controllers/book');

router.get('/', booksCtrl.getAllBooks);
router.post('/', auth, multer, booksCtrl.addBook);
router.get('/bestrating', booksCtrl.bestRatingBook);
router.get('/:id', booksCtrl.getOneBook);
router.put('/:id', auth, multer, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.post('/:id/rating', auth, booksCtrl.ratingBook);


module.exports = router;
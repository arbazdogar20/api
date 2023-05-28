const router = require('express').Router();
const multer = require('multer');

const {addStock} = require('../controllers/stock');
const verifyToken = require('../utils/verifyToken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage: storage});

router.post('/addstock', verifyToken, upload.single('fileName'), addStock);

module.exports = router;

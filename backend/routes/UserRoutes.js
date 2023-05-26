const express = require('express');
const router = express.Router();

//Controller 
const { register } = require('../controllers/UserController');

//Midlewares
const validate = require('../middlewares/handleValidation');

router.post('/register', validate, register);

module.exports = router;

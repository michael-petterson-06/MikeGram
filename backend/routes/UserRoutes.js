const express = require('express');
const router = express.Router();

//Controller 
const { register } = require('../controllers/UserController');

//Midlewares
const validate = require('../middlewares/handleValidation');
const { userCreateValidation } = require('../middlewares/userValidations');

router.post('/register', userCreateValidation(), validate, register);

module.exports = router;

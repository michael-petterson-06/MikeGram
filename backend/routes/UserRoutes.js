const express = require('express');
const router = express.Router();

//Controller 
const { register, login, getCurrentUser, update } = require('../controllers/UserController');

//Midlewares
const validate = require('../middlewares/handleValidation');
const { userCreateValidation, loginValidation, userUpdateValidatiion } = require('../middlewares/userValidations');
const { authGuard } = require('../middlewares/authGuard');
const { imageUpload } = require('../middlewares/imageUpload');


//Routers
router.post('/register', userCreateValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser);
router.put('/', authGuard,
             userUpdateValidatiion(), validate, imageUpload.single('profileImage'), update);

module.exports = router;

const Router = require('express');
const router = new Router(); //объект роутера
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration); //регистрация
router.post('/login', userController.login); //авторизация
router.get('/auth', authMiddleware, userController.check); //проверка авторизации пользователя

module.exports = router; //экспортируем

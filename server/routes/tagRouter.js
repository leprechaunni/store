const Router = require('express');
const tagController = require('../controllers/tagController');
const router = new Router(); //объект роутера
const TagController = require('../controllers/tagController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), tagController.create); //создавать жанр
router.get('/', tagController.getAll); //получать
router.delete('/:id', checkRole('ADMIN'), tagController.deleteById); //удалить

module.exports = router; //экспортируем

const Router = require('express');
const router = new Router(); //объект роутера
const GameController = require('../controllers/gameController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN', 'DEV'), GameController.create); //создавать
router.get('/', GameController.getAll); //получать
router.get('/:id', GameController.getOne); //получать конкретную игру
router.delete('/:id', checkRole('ADMIN', 'DEV'), GameController.deleteById); //удалить

module.exports = router; //экспортируем

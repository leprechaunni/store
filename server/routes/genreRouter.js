const Router = require('express');
const router = new Router(); //объект роутера
const GenreController = require('../controllers/genreController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), GenreController.create); //создавать жанр
router.get('/', GenreController.getAll); //получать
router.delete('/:id', checkRole('ADMIN'), GenreController.deleteById); //удалить

module.exports = router; //экспортируем

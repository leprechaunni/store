const Router = require('express');
const router = new Router(); //объект роутера
const gameRouter = require('./gameRouter');
const genreRouter = require('./genreRouter');
const tagRouter = require('./tagRouter');
const userRouter = require('./userRouter');

router.use('/user', userRouter);
router.use('/genre', genreRouter);
router.use('/tag', tagRouter);
router.use('/game', gameRouter);

module.exports = router; //экспортируем

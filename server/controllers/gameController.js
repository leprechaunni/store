const { Game, GameInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class GameController {
   async create(req, res, next) {
      try {
         let { name, genreId, tagId, info } = req.body;
         const { img } = req.files;
         let fileName = uuid.v4() + '.jpg';
         img.mv(path.resolve(__dirname, '..', 'static', fileName));

         const game = await Game.create({
            name,
            genreId,
            tagId,
            img: fileName,
         });

         if (info) {
            info = JSON.parse(info);
            info.array.forEach((i) =>
               GameInfo.create({
                  title: i.title,
                  description: i.description,
                  gameId: game.id,
               })
            );
         }

         return res.json(game);
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async getAll(req, res) {
      let { genreId, tagId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let games;
      if (!genreId && !tagId) {
         games = await Game.findAndCountAll({ limit, offset });
      }
      if (genreId && !tagId) {
         games = await Game.findAndCountAll({
            where: { genreId },
            limit,
            offset,
         });
      }
      if (!genreId && tagId) {
         games = await Game.findAndCountAll({
            where: { tagId },
            limit,
            offset,
         });
      }
      if (genreId && tagId) {
         games = await Game.findAndCountAll({
            where: { genreId, tagId },
            limit,
            offset,
         });
      }
      return res.json(games);
   }

   async getOne(req, res) {
      const { id } = req.params;
      const game = await Game.findOne({
         where: { id },
         include: [{ model: GameInfo, as: 'info' }],
      });
      return res.json(game);
   }

   async deleteById(req, res, next) {
      const { id } = req.params;
      const game = await Game.destroy({
         where: { id },
         include: [{ model: GameInfo, as: 'info' }],
      });
      if (game === 1) {
         return res.json({ message: 'Приложение удалено' });
      } else {
         return next(ApiError.internal('Приложение не найдено'));
      }
   }
}

module.exports = new GameController();

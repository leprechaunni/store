const { Genre } = require('../models/models');
const ApiError = require('../error/ApiError');
class GenreController {
   async create(req, res) {
      const { name } = req.body;
      const genre = await Genre.create({ name });
      return res.json(genre);
   }

   async getAll(req, res) {
      const genres = await Genre.findAll();
      return res.json(genres);
   }

   async deleteById(req, res, next) {
      const { id } = req.params;
      const genre = await Genre.destroy({ where: { id } });
      if (genre === 1) {
         return res.json({ message: 'Жанр удален' });
      } else {
         return next(ApiError.internal('Жанр не найден'));
      }
   }
}

module.exports = new GenreController();

const { Tag } = require('../models/models');
const ApiError = require('../error/ApiError');
class TagController {
   async create(req, res) {
      const { name } = req.body;
      const tag = await Tag.create({ name });
      return res.json(tag);
   }

   async getAll(req, res) {
      const tags = await Tag.findAll();
      return res.json(tags);
   }

   async deleteById(req, res, next) {
      const { id } = req.params;
      const tag = await Tag.destroy({ where: { id } });
      if (tag === 1) {
         return res.json({ message: 'Тэг удален' });
      } else {
         return next(ApiError.internal('Тэг не найден'));
      }
   }
}

module.exports = new TagController();

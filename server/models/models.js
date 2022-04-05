const sequelize = require('../db');
const { DataTypes } = require('sequelize'); //с помощью класса описываются типы поля

const User = sequelize.define('user', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true },
   password: { type: DataTypes.STRING },
   role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Game = sequelize.define('game', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
   rating: { type: DataTypes.INTEGER, defaultValue: 0 },
   img: { type: DataTypes.STRING, allowNull: false },
});

const Genre = sequelize.define('genre', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Tag = sequelize.define('tag', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
});

const GameInfo = sequelize.define('game_info', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   title: { type: DataTypes.STRING, allowNull: false },
   description: { type: DataTypes.STRING, allowNull: false },
});

const UserGame = sequelize.define('user_game', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const GenreTag = sequelize.define('genre_tag', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(User, { through: UserGame });

User.hasMany(Rating);
Rating.belongsTo(User);

Genre.hasMany(Game);
Game.belongsTo(Genre);

Tag.hasMany(Game);
Game.belongsTo(Tag);

Game.hasMany(Rating);
Rating.belongsTo(Game);

Game.hasMany(GameInfo, { as: 'info' });
GameInfo.belongsTo(Game);

Genre.belongsToMany(Tag, { through: GenreTag });
Tag.belongsToMany(Genre, { through: GenreTag });

module.exports = {
   User,
   Game,
   GameInfo,
   Genre,
   Tag,
   GenreTag,
   Rating,
   UserGame,
};

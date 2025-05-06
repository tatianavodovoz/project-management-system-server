"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbconfig/db"));
class Board extends sequelize_1.Model {
    // связи
    static associate(models) {
        Board.belongsTo(models.Client, { foreignKey: 'board_creator_id' });
        Board.hasMany(models.Task, { foreignKey: 'task_board_id' });
    }
}
Board.init({
    board_id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    board_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    board_general: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    board_creator_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: 'board',
});
exports.default = Board;

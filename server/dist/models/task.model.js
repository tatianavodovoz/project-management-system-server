"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbconfig/db"));
class Task extends sequelize_1.Model {
    // связи
    static associate(models) {
        Task.belongsTo(models.Client, { foreignKey: 'task_performer_id' });
        Task.belongsTo(models.Board, { foreignKey: 'task_board_id' });
    }
}
Task.init({
    task_id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    task_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    task_description: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true,
    },
    task_status: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    task_performer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    task_deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    task_board_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: 'task',
});
exports.default = Task;

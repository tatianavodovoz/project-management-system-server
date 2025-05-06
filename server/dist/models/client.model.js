"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbconfig/db"));
class Client extends sequelize_1.Model {
    // связи
    static associate(models) {
        Client.hasMany(models.Board, { foreignKey: 'board_creator_id' });
        Client.hasMany(models.Task, { foreignKey: 'task_performer_id' });
    }
}
Client.init({
    client_id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    client_email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    client_password: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    client_admin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: 'client',
});
exports.default = Client;

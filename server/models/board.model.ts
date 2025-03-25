import { DataTypes, Model } from 'sequelize';
import sequelize from '../dbconfig/db';

class Board extends Model {
    public board_id!: number;
    public board_name!: string;
    public board_general!: boolean;
    public board_creator_id!: number;

    // связи
    static associate(models: any) {
        Board.belongsTo(models.Client, { foreignKey: 'board_creator_id' });
        Board.hasMany(models.Task, { foreignKey: 'task_board_id' });
    }
}

Board.init({
    board_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    board_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    board_general: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    board_creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'board'
});

export default Board;
import { DataTypes, Model } from 'sequelize';
import sequelize from '../dbconfig/db';

class Task extends Model {
    public task_id!: number;
    public task_name!: string;
    public task_description!: string;
    public task_status!: string;
    public task_performer_id!: number;
    public task_deadline!: Date;
    public task_board_id!: number;

    // связи
    static associate(models: any) {
        Task.belongsTo(models.Client, { foreignKey: 'task_performer_id' });
        Task.belongsTo(models.Board, { foreignKey: 'task_board_id' });
    }
}

Task.init({
    task_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    task_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    task_description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    task_status: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    task_performer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    task_deadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    task_board_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'task',
});

export default Task;
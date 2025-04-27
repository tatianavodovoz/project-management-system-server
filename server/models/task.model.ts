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
    public task_importance!: number;
    public task_time_warning!: number;
    public task_category_matrix!: number;

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
    task_importance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    task_time_warning: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    task_category_matrix: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4,
    },
}, {
    sequelize,
    tableName: 'task',
});

export default Task;
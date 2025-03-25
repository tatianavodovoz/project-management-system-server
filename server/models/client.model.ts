import { DataTypes, Model } from 'sequelize';
import sequelize from '../dbconfig/db';

class Client extends Model {
    public client_id!: number;
    public client_email!: string;
    public client_password!: string;
    public client_admin!: boolean;
    public client_name!: string;
    public client_token!: string;

    // связи
    static associate(models: any) {
        Client.hasMany(models.Board, { foreignKey: 'board_creator_id' });
        Client.hasMany(models.Task, { foreignKey: 'task_performer_id' });
    }
}

Client.init({
    client_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    client_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    client_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    client_password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    client_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    client_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'client',
    timestamps: false // Отключаем поля createdAt и updatedAt
});

export default Client;
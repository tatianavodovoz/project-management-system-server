import { Sequelize } from 'sequelize';
import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Загружаем переменные окружения
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = parseInt(process.env.DB_PORT || '5432');
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Отладочный вывод
console.log('Database configuration:', {
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD: DB_PASSWORD
});

// Функция для создания базы данных
async function createDatabase() {
    console.log(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME);
    const client = new Client({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: 'postgres' // Подключаемся к системной БД
    });

    try {
        await client.connect();
        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`
        );

        if (result.rowCount === 0) {
            await client.query(`CREATE DATABASE ${DB_NAME}`);
            console.log(`База данных ${DB_NAME} успешно создана`);
        }
    } catch (error) {
        console.error('Ошибка при создании базы данных:', error);
    } finally {
        await client.end();
    }
}

// Создаем экземпляр Sequelize
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: false, // Отключаем логи SQL-запросов
});

// Функция для инициализации базы данных
export async function initializeDatabase() {
    await createDatabase();

    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно установлено');

        // Синхронизация моделей с базой данных
        await sequelize.sync({ alter: true });
        console.log('Модели успешно синхронизированы с базой данных');
    } catch (error) {
        console.error('Ошибка при инициализации базы данных:', error);
        throw error;
    }
}

export default sequelize; 
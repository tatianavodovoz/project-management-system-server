import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import boardRoutes from './routes/board.routes';
import taskRoutes from './routes/task.routes';
import clientRoutes from './routes/client.routes';
import sequelize from './dbconfig/db';

// Загрузка переменных окружения
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Проверка подключения к базе данных
sequelize.authenticate()
    .then(() => {
        console.log('Connection to database has been established successfully.');
        
        // Синхронизация моделей с базой данных
        // alter: true - обновляет существующие таблицы, сохраняя данные
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Database models synchronized successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', boardRoutes);
app.use('/api', taskRoutes);
app.use('/api', clientRoutes);

// Проверка работоспособности сервера
app.get('/health', (_req, res) => {
    res.json({ status: 'Server is running' });
});

// Обработка несуществующих маршрутов
app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

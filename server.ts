import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import boardRoutes from './server/routes/board.routes';
import taskRoutes from './server/routes/task.routes';
import clientRoutes from './server/routes/client.routes';
import { initializeDatabase } from './server/dbconfig/db';

// Загрузка переменных окружения
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

// Инициализация базы данных и запуск сервера
initializeDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });

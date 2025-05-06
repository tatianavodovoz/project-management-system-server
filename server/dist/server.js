"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const board_routes_1 = __importDefault(require("./routes/board.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const client_routes_1 = __importDefault(require("./routes/client.routes"));
const db_1 = __importDefault(require("./dbconfig/db"));
// Загрузка переменных окружения
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Проверка подключения к базе данных
db_1.default.authenticate()
    .then(() => {
    console.log('Connection to database has been established successfully.');
    // Синхронизация моделей с базой данных
    return db_1.default.sync({ force: false });
})
    .then(() => {
    console.log('Database models synchronized successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api', board_routes_1.default);
app.use('/api', task_routes_1.default);
app.use('/api', client_routes_1.default);
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

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
/**
 * Получение списка всех задач
 * @param req - Express Request объект
 * @param res - Express Response объект
 * @returns Массив задач или ошибку 500 при неудаче
 */
const getTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.default.findAll();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getTasks = getTasks;
/**
 * Создание новой задачи
 * @param req - Express Request объект с данными задачи в теле запроса
 * @param res - Express Response объект
 * @returns Созданную задачу и статус 201 или ошибку 500 при неудаче
 */
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_name, task_description, task_status, task_performer_id, task_deadline, task_board_id } = req.body;
        const task = yield task_model_1.default.create({
            task_name,
            task_description,
            task_status,
            task_performer_id,
            task_deadline,
            task_board_id
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createTask = createTask;
/**
 * Обновление существующей задачи
 * @param req - Express Request объект с task_id в параметрах и данными для обновления в теле
 * @param res - Express Response объект
 * @returns Обновленную задачу или ошибку 404/500
 */
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_id } = req.params;
        const task = yield task_model_1.default.findByPk(task_id);
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        yield task.update(req.body);
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateTask = updateTask;
/**
 * Удаление задачи
 * @param req - Express Request объект с task_id в параметрах
 * @param res - Express Response объект
 * @returns Статус 204 при успехе или ошибку 404/500
 */
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_id } = req.params;
        const task = yield task_model_1.default.findByPk(task_id);
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        yield task.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteTask = deleteTask;

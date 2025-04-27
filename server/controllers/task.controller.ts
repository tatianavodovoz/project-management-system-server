import { Request, Response, RequestHandler } from 'express';
import Task from '../models/task.model';

/**
 * Параметры URL для запросов к задаче
 * @interface TaskParams
 * @property {string} task_id - Идентификатор задачи в URL запроса (например, /api/tasks/123)
 */
export interface TaskParams {
    task_id: string;
}

/**
 * Тело запроса для создания/обновления задачи
 * @interface TaskBody
 * @property {string} task_name - Название задачи
 * @property {string} task_description - Подробное описание задачи
 * @property {string} task_status - Статус задачи (например, "в работе", "завершена")
 * @property {number} task_performer_id - ID исполнителя задачи
 * @property {Date} task_deadline - Срок выполнения задачи
 * @property {number} task_board_id - ID доски, к которой привязана задача
 * @property {boolean} task_importance - Важность задачи
 * @property {number} task_time_warning - За сколько дней до дедлайна задача считается срочной
 * @property {number} task_category_matrix - Категория задачи в Матрице Эйзенхауэра
 */
export interface TaskBody {
    task_name: string;
    task_description: string;
    task_status: string;
    task_performer_id: number;
    task_deadline: Date;
    task_board_id: number;
    task_importance: boolean;
    task_time_warning: number;
    task_category_matrix: number;
}

/**
 * Получение списка всех задач
 * @param req - Express Request объект
 * @param res - Express Response объект
 * @returns Массив задач или ошибку 500 при неудаче
 */
export const getTasks: RequestHandler = async (req, res) => {
    try {
        const { board_id } = req.query;
        
        const where = board_id ? { task_board_id: Number(board_id) } : {};
        const tasks = await Task.findAll({ where });
        
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Создание новой задачи
 * @param req - Express Request объект с данными задачи в теле запроса
 * @param res - Express Response объект
 * @returns Созданную задачу и статус 201 или ошибку 500 при неудаче
 */
export const createTask: RequestHandler<{}, any, TaskBody> = async (req, res) => {
    try {
        const { 
            task_name, 
            task_description, 
            task_status, 
            task_performer_id, 
            task_deadline, 
            task_board_id,
            task_importance,
            task_time_warning,
            task_category_matrix
        } = req.body;

        const task = await Task.create({
            task_name,
            task_description,
            task_status,
            task_performer_id,
            task_deadline,
            task_board_id,
            task_importance,
            task_time_warning,
            task_category_matrix
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Обновление существующей задачи
 * @param req - Express Request объект с task_id в параметрах и данными для обновления в теле
 * @param res - Express Response объект
 * @returns Обновленную задачу или ошибку 404/500
 */
export const updateTask: RequestHandler<TaskParams, any, Partial<TaskBody>> = async (req, res) => {
    try {
        const { task_id } = req.params;
        const task = await Task.findByPk(task_id);
        
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        await task.update(req.body);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Удаление задачи
 * @param req - Express Request объект с task_id в параметрах
 * @param res - Express Response объект
 * @returns Статус 204 при успехе или ошибку 404/500
 */
export const deleteTask: RequestHandler<TaskParams> = async (req, res) => {
    try {
        const { task_id } = req.params;
        const task = await Task.findByPk(task_id);
        
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        await task.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

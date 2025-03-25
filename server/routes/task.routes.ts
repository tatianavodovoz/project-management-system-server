import { Router } from 'express';
import { 
    getTasks, 
    createTask, 
    updateTask, 
    deleteTask 
} from '../controllers/task.controller';

const router = Router();

// GET /api/tasks - получить список задач
// Поддерживает фильтрацию по board_id через query параметр
// Пример: /api/tasks?board_id=1 - получить все задачи доски №1
// Возвращает массив задач с их названиями, описаниями, статусами и сроками
router.get('/tasks', getTasks);

// POST /api/tasks - создать новую задачу
// Принимает данные задачи: название, описание, статус, исполнителя, срок и ID доски
router.post('/tasks', createTask);

// PUT /api/tasks/:task_id - обновить задачу
// Используется для изменения любых полей задачи (название, описание, срок и т.д.)
router.put('/tasks/:task_id', updateTask);

// PATCH /api/tasks/:task_id - обновить статус задачи
// Используется при перетаскивании задачи между колонками на доске
router.patch('/tasks/:task_id', updateTask);

// DELETE /api/tasks/:task_id - удалить задачу
// Полностью удаляет задачу из системы
router.delete('/tasks/:task_id', deleteTask);

export default router; 
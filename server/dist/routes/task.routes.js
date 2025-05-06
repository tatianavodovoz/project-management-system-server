"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
// GET /api/tasks - получить все задачи
router.get('/tasks', task_controller_1.getTasks);
// POST /api/tasks - создать новую задачу
router.post('/tasks', task_controller_1.createTask);
// PUT /api/tasks/:task_id - обновить задачу
router.put('/tasks/:task_id', task_controller_1.updateTask);
// DELETE /api/tasks/:task_id - удалить задачу
router.delete('/tasks/:task_id', task_controller_1.deleteTask);
exports.default = router;

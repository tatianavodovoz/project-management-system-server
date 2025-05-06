"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const router = (0, express_1.Router)();
// GET /api/clients - получить всех пользователей
router.get('/clients', client_controller_1.getClients);
// POST /api/clients - создать нового пользователя
router.post('/clients', client_controller_1.createClient);
// POST /api/clients/login - аутентификация пользователя
router.post('/clients/login', client_controller_1.loginClient);
// PUT /api/clients/:client_id - обновить данные пользователя
router.put('/clients/:client_id', client_controller_1.updateClient);
// DELETE /api/clients/:client_id - удалить пользователя
router.delete('/clients/:client_id', client_controller_1.deleteClient);
exports.default = router;

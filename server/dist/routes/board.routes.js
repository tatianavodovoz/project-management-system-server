"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_controller_1 = require("../controllers/board.controller");
const router = (0, express_1.Router)();
// GET /api/boards - получить все доски
router.get('/boards', board_controller_1.getBoards);
// POST /api/boards - создать новую доску
router.post('/boards', board_controller_1.createBoard);
// PUT /api/boards/:board_id - обновить доску
router.put('/boards/:board_id', board_controller_1.updateBoard);
// DELETE /api/boards/:board_id - удалить доску
router.delete('/boards/:board_id', board_controller_1.deleteBoard);
exports.default = router;

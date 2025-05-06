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
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getBoards = void 0;
const board_model_1 = __importDefault(require("../models/board.model"));
/**
 * Получение списка всех досок
 * @param req - Express Request объект
 * @param res - Express Response объект
 * @returns Массив досок или ошибку 500 при неудаче
 */
const getBoards = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boards = yield board_model_1.default.findAll();
        res.json(boards);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getBoards = getBoards;
/**
 * Создание новой доски
 * @param req - Express Request объект с данными доски в теле запроса
 * @param res - Express Response объект
 * @returns Созданную доску и статус 201 или ошибку 500 при неудаче
 */
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { board_name, board_general, board_creator_id } = req.body;
        const board = yield board_model_1.default.create({
            board_name,
            board_general,
            board_creator_id
        });
        res.status(201).json(board);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createBoard = createBoard;
/**
 * Обновление существующей доски
 * @param req - Express Request объект с board_id в параметрах и данными для обновления в теле
 * @param res - Express Response объект
 * @returns Обновленную доску или ошибку 404/500
 */
const updateBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { board_id } = req.params;
        const { board_name, board_general } = req.body;
        const board = yield board_model_1.default.findByPk(board_id);
        if (!board) {
            res.status(404).json({ error: 'Board not found' });
            return;
        }
        yield board.update({ board_name, board_general });
        res.json(board);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateBoard = updateBoard;
/**
 * Удаление доски
 * @param req - Express Request объект с board_id в параметрах
 * @param res - Express Response объект
 * @returns Статус 204 при успехе или ошибку 404/500
 */
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { board_id } = req.params;
        const board = yield board_model_1.default.findByPk(board_id);
        if (!board) {
            res.status(404).json({ error: 'Board not found' });
            return;
        }
        yield board.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteBoard = deleteBoard;

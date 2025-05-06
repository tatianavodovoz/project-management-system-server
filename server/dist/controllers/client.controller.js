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
exports.loginClient = exports.deleteClient = exports.updateClient = exports.createClient = exports.getClients = void 0;
const client_model_1 = __importDefault(require("../models/client.model"));
/**
 * Получение списка всех пользователей
 * @param req - Express Request объект
 * @param res - Express Response объект
 * @returns Массив пользователей или ошибку 500 при неудаче
 */
const getClients = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield client_model_1.default.findAll();
        res.json(clients);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getClients = getClients;
/**
 * Создание нового пользователя
 * @param req - Express Request объект с данными пользователя в теле запроса
 * @param res - Express Response объект
 * @returns Созданного пользователя и статус 201 или ошибку 500 при неудаче
 */
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client_name, client_email, client_password, client_role } = req.body;
        const client = yield client_model_1.default.create({
            client_name,
            client_email,
            client_password,
            client_role
        });
        res.status(201).json(client);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createClient = createClient;
/**
 * Обновление данных пользователя
 * @param req - Express Request объект с client_id в параметрах и данными для обновления в теле
 * @param res - Express Response объект
 * @returns Обновленного пользователя или ошибку 404/500
 */
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client_id } = req.params;
        const client = yield client_model_1.default.findByPk(client_id);
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
            return;
        }
        yield client.update(req.body);
        res.json(client);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateClient = updateClient;
/**
 * Удаление пользователя
 * @param req - Express Request объект с client_id в параметрах
 * @param res - Express Response объект
 * @returns Статус 204 при успехе или ошибку 404/500
 */
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client_id } = req.params;
        const client = yield client_model_1.default.findByPk(client_id);
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
            return;
        }
        yield client.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteClient = deleteClient;
/**
 * Аутентификация пользователя
 * @param req - Express Request объект с email и password в теле запроса
 * @param res - Express Response объект
 * @returns Данные пользователя при успехе или ошибку 401/500
 */
const loginClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client_email, client_password } = req.body;
        const client = yield client_model_1.default.findOne({ where: { client_email } });
        if (!client || client.client_password !== client_password) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        res.json(client);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.loginClient = loginClient;

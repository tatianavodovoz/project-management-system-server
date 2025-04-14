import { RequestHandler } from 'express';
import Board from '../models/board.model';
import Client from '../models/client.model';
import { Op } from 'sequelize';
import { isToken } from './client.controller';

/**
 * Параметры URL для запросов к доске
 * @interface BoardParams
 * @property {string} board_id - Идентификатор доски в URL запроса (например, /api/boards/123)
 */
export interface BoardParams {
    board_id: string;
}

/**
 * Тело запроса для создания/обновления доски
 * @interface BoardBody
 * @property {string} board_name - Название доски
 * @property {boolean} board_general - Флаг, является ли доска общей
 * @property {number} board_creator_id - ID пользователя, создавшего доску
 * @property {string} client_token - Токен клиента
 */
export interface BoardBody {
    client_token: string;
        board_name: string;
        board_general: boolean;
        board_creator_id: number;
    
}



/**
 * Получение списка всех досок
 * @param req - Express Request объект
 * @param res - Express Response объект
 * @returns Массив досок или ошибку 500 при неудаче
 */
export const getBoards: RequestHandler = async (req, res) => {
    try {
        const clientToken = req.headers.client_token;
        if (!clientToken || typeof clientToken !== 'string') {
            res.status(401).json({ error: 'Отсутствует или неверный токен клиента' });
            return;
        }
        const client_id = await isToken(clientToken);
        const boards = await Board.findAll({
            where: {
                board_creator_id: client_id
            }
        });
        res.json(boards);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Создание новой доски
 * @param req - Express Request объект с данными доски в теле запроса
 * @param res - Express Response объект
 * @returns Созданную доску и статус 201 или ошибку 500 при неудаче
 */
export const createBoard: RequestHandler<{}, any, BoardBody> = async (req, res) => {
    try {
        const clientToken = req.headers.client_token;
        if (!clientToken || typeof clientToken !== 'string') {
            res.status(401).json({ error: 'Отсутствует или неверный токен клиента' });
            return;
        }

        const client_id = await isToken(clientToken);
        
        if (!client_id) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const { board_name, board_general } = req.body;
        const board = await Board.create({
            board_name,
            board_general,
            board_creator_id: client_id
        });
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Обновление существующей доски
 * @param req - Express Request объект с board_id в параметрах и данными для обновления в теле
 * @param res - Express Response объект
 * @returns Обновленную доску или ошибку 404/500
 */
export const updateBoard: RequestHandler<BoardParams, any, Partial<BoardBody>> = async (req, res) => {
    try {
        const clientToken = req.headers.client_token;
        if (!clientToken || typeof clientToken !== 'string') {
            res.status(401).json({ error: 'Отсутствует или неверный токен клиента' });
            return;
        }

        const client_id = await isToken(clientToken);
        
        if (!client_id) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const { board_id } = req.params;
        const { board_name, board_general } = req.body;
        
        const board = await Board.findOne({
            where: {
                board_id,
                board_creator_id: client_id
            }
        });
        
        if (!board) {
            res.status(404).json({ error: 'Board not found' });
            return;
        }

        await board.update({ board_name, board_general });
        res.json(board);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Удаление доски
 * @param req - Express Request объект с board_id в параметрах
 * @param res - Express Response объект
 * @returns Статус 204 при успехе или ошибку 404/500
 */
export const deleteBoard: RequestHandler<BoardParams> = async (req, res) => {
    try {
        const clientToken = req.headers.client_token;
        if (!clientToken || typeof clientToken !== 'string') {
            res.status(401).json({ error: 'Отсутствует или неверный токен клиента' });
            return;
        }
        const client_id = await isToken(clientToken);
        
        if (!client_id) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const { board_id } = req.params;
        
        const board = await Board.findOne({
            where: {
                board_id,
                board_creator_id: client_id
            }
        });
        
        if (!board) {
            res.status(404).json({ error: 'Board not found' });
            return;
        }

        await board.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Получение информации о конкретной доске
 * @param req - Express Request объект с board_id в параметрах
 * @param res - Express Response объект
 * @returns Доску или ошибку 404/500
 */
export const getBoard: RequestHandler<BoardParams> = async (req, res) => {
    try {
        const clientToken = req.headers.client_token;
        if (!clientToken || typeof clientToken !== 'string') {
            res.status(401).json({ error: 'Отсутствует или неверный токен клиента' });
            return;
        }
        const client_id = await isToken(clientToken);
        
        if (!client_id) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const { board_id } = req.params;
        const board = await Board.findOne({
            where: {
                board_id,
                board_creator_id: client_id
            }
        });
        
        if (!board) {
            res.status(404).json({ error: 'Board not found' });
            return;
        }

        res.json(board);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
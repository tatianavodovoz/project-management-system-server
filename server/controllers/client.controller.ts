import { RequestHandler } from 'express';
import Client from '../models/client.model';
import { Op } from 'sequelize';

/**
 * Параметры URL для запросов к пользователю
 * @interface ClientParams
 * @property {string} client_id - Идентификатор пользователя в URL запроса (например, /api/clients/123)
 */
export interface ClientParams {
    client_id: string;
}

/**
 * Тело запроса для создания/обновления пользователя
 * @interface ClientBody
 * @property {string} client_name - Имя пользователя
 * @property {string} client_email - Email пользователя (уникальный)
 * @property {string} client_password - Пароль пользователя
 * @property {boolean} client_admin - Администратор ли пользователь
 * @property {string} client_token - Токен
 */
export interface ClientBody {
    client_name: string;
    client_email: string;
    client_password: string;
    client_role: 'admin' | 'user';
    client_token: string;
}

/**
 * Тело запроса для аутентификации пользователя
 * @interface LoginBody
 * @property {string} client_email - Email пользователя для входа
 * @property {string} client_password - Пароль пользователя для входа
 */
export interface LoginBody {
    client_email: string;
    client_password: string;
}

export const isToken = async (client_token:string) => {
    try {
        const client = await Client.findOne({
            where: {
                client_token: {
                    [Op.eq]: client_token
                }
            },
            attributes: ['client_id'] // Возвращаем только id
        });

        console.log(client);

        if (client) {
            return client.dataValues.client_id; // Возвращаем id, если токен найден
        } else {
            return null; // Токен не найден
        }
    } catch (error) {
        console.error('Ошибка при поиске клиента по токену:', error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Получение списка всех пользователей
 * @param req - Express Request объект
 * @param res - Express Response объект
 * @returns Массив пользователей или ошибку 500 при неудаче
 */
export const getClients: RequestHandler = async (_req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Создание нового пользователя
 * @param req - Express Request объект с данными пользователя в теле запроса
 * @param res - Express Response объект
 * @returns Созданного пользователя и статус 201 или ошибку 500 при неудаче
 */
export const createClient: RequestHandler<{}, any, ClientBody> = async (req, res) => {
    try {
        console.log('Получены данные для создания клиента:', req.body);
        const { client_name, client_email, client_password, client_role } = req.body;
        
        // Устанавливаем client_admin в зависимости от client_role
        const client_admin = client_role === 'admin';

        console.log('Создаем клиента с данными:', {
            client_name,
            client_email,
            client_password,
            client_admin
        });

        console.log('client_admin перед сохранением:', client_admin);

        const client_token = require('crypto').randomBytes(32).toString('base64');

        const client = await Client.create({
            client_name,
            client_email,
            client_password,
            client_admin,
            client_token
        });

        console.log('Клиент успешно создан:', client.toJSON());
        res.status(201).json(client);
    } catch (error: any) {
        console.error('Ошибка при создании клиента:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message,
            details: JSON.stringify(error)
        });
    }
};

/**
 * Обновление данных пользователя
 * @param req - Express Request объект с client_id в параметрах и данными для обновления в теле
 * @param res - Express Response объект
 * @returns Обновленного пользователя или ошибку 404/500
 */
export const updateClient: RequestHandler<ClientParams, any, Partial<ClientBody>> = async (req, res) => {
    try {
        const { client_id } = req.params;
        const client = await Client.findByPk(client_id);
        
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
            return;
        }

        await client.update(req.body);
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Удаление пользователя
 * @param req - Express Request объект с client_id в параметрах
 * @param res - Express Response объект
 * @returns Статус 204 при успехе или ошибку 404/500
 */
export const deleteClient: RequestHandler<ClientParams> = async (req, res) => {
    try {
        const { client_id } = req.params;
        const client = await Client.findByPk(client_id);
        
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
            return;
        }

        await client.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Аутентификация пользователя
 * @param req - Express Request объект с email и password в теле запроса
 * @param res - Express Response объект
 * @returns Данные пользователя при успехе или ошибку 401/500
 */
export const loginClient: RequestHandler<{}, any, LoginBody> = async (req, res) => {
    try {
        console.log('=== Начало процесса входа ===');
        console.log('Получены данные для входа:', req.body);
        const { client_email, client_password } = req.body;
        
        console.log('Ищем пользователя с email:', client_email);
        const client = await Client.findOne({ 
            where: { client_email },
            raw: true // Получаем чистый объект для отладки
        });

        console.log('Результат поиска пользователя:', client);

        if (!client) {
            console.log('Пользователь не найден');
            res.status(401).json({ 
                error: 'Invalid email or password',
                message: 'Пользователь с таким email не найден'
            });
            return;
        }

        console.log('Пользователь найден, сравниваем пароли');
        console.log('Введенный пароль:', client_password);
        console.log('Пароль в базе:', client.client_password);

        if (client.client_password !== client_password) {
            console.log('Пароли не совпадают');
            res.status(401).json({ 
                error: 'Invalid email or password',
                message: 'Неверный пароль'
            });
            return;
        }

        console.log('Авторизация успешна');
        const userData = {
            client_id: client.client_id,
            client_email: client.client_email,
            client_name: client.client_name,
            client_admin: client.client_admin
        };

        console.log('Отправляем данные пользователя:', userData);

        res.json({
            token: client.client_token,
            user: userData
        });
        console.log('=== Конец процесса входа ===');
    } catch (error: any) {
        console.error('Ошибка при входе:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message 
        });
    }
};

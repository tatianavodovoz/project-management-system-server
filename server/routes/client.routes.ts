import { Router } from 'express';
import { 
    getClients, 
    createClient, 
    updateClient, 
    deleteClient,
    loginClient 
} from '../controllers/client.controller';

const router = Router();

// GET /api/clients - получить всех пользователей
router.get('/clients', getClients);

// POST /api/clients - создать нового пользователя
router.post('/clients', createClient);

// POST /api/clients/login - аутентификация пользователя
router.post('/clients/login', loginClient);

// PUT /api/clients/:client_id - обновить данные пользователя
router.put('/clients/:client_id', updateClient);

// DELETE /api/clients/:client_id - удалить пользователя
router.delete('/clients/:client_id', deleteClient);

export default router; 
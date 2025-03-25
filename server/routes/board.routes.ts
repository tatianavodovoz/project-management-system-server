import { Router } from 'express';
import { 
    getBoards,
    getBoard,
    createBoard, 
    updateBoard, 
    deleteBoard 
} from '../controllers/board.controller';

const router = Router();

// GET /api/boards - получить список всех досок
// Используется на странице со списком всех досок (/boards)
// Возвращает массив всех досок с их ID, названиями и другими свойствами
router.get('/boards', getBoards);

// GET /api/boards/:board_id - получить информацию о конкретной доске
// Используется при открытии конкретной доски (/boards/1)
// Возвращает детальную информацию о доске: название, создателя, тип (общая/личная)
router.get('/boards/:board_id', getBoard);

// POST /api/boards - создать новую доску
router.post('/boards', createBoard);

// PUT /api/boards/:board_id - обновить доску
router.put('/boards/:board_id', updateBoard);

// DELETE /api/boards/:board_id - удалить доску
router.delete('/boards/:board_id', deleteBoard);


export default router;
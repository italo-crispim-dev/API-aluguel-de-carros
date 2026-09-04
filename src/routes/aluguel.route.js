import express from 'express'
import {
    listarAlugueis,
    buscarAluguel,
    realizarAluguel,
    alterarAluguel,
    liberarAluguel,
} from '../controllers/aluguel.constroller.js'
import { validar, validarId } from '../middleware/validation.middleware.js';
import { alterarAluguelSchema, criarAluguelSchema, idSchema } from '../validators/aluguel.validator.js';
import { autenticar, autorizar } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(autenticar)

router.get('/', listarAlugueis);
router.get('/:id',validarId(idSchema), buscarAluguel);
router.post('/', 
    validar(criarAluguelSchema),
    realizarAluguel
);
router.put('/:id', validarId(idSchema),validar(alterarAluguelSchema),alterarAluguel);
router.patch('/:id/finalizar',autorizar("ADMIN"), validarId(idSchema), liberarAluguel);

export default router

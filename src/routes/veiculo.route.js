import express from 'express'
import {
    listarveiculos,
    buscarVeiculo,
    deletarVeiculo,
    atualizarVeiculo,
    criarVeiculo
} from '../controllers/veiculo.controller.js'
import { validar, validarId } from '../middleware/validation.middleware.js';
import { criarVeiculoSchema, idSchema } from '../validators/veiculo.validator.js';
import { atualizarVeiculoSchema } from '../validators/veiculo.validator.js';
import { autenticar,autorizar } from '../middleware/auth.middleware.js';


const router = express.Router();

router.use(autenticar)

router.get('/',  listarveiculos);
router.get('/:id', validarId(idSchema), buscarVeiculo);
router.post('/', autorizar("ADMIN"),
    validar(criarVeiculoSchema),
    criarVeiculo
);
router.put('/:id', autorizar("ADMIN"), validarId(idSchema),validar(atualizarVeiculoSchema), atualizarVeiculo);
router.delete('/:id', autorizar("ADMIN"), validarId(idSchema), deletarVeiculo);

export default router;
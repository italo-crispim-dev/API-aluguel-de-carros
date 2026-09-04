import express from 'express';
import { cadastrarUsuario, buscarUsuario } from '../controllers/usuario.constroller.js';
import { validar, validarId } from '../middleware/validation.middleware.js';
import { criarUsuarioSchema, idSchema } from '../validators/usuario.validator.js';
import { autenticar, autorizar } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', validar(criarUsuarioSchema), cadastrarUsuario);
router.get('/:id', autenticar, autorizar("ADMIN") ,validarId(idSchema), buscarUsuario);

export default router
import express from 'express';
import { login} from '../controllers/auth.controller.js'
import { validar } from '../middleware/validation.middleware.js';
import { loginSchema } from '../validators/usuario.validator.js';

const router = express.Router();

router.post('/', validar(loginSchema), login);

export default router;

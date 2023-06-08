import express, { Request, Response } from 'express';
import { AuthValidator } from "../validators/Auth.validator";
import AuthController from "../controllers/Auth.controller";

const router = express.Router();

/**
 * Verifica se a Api está online
 */
router.get('/ping', (req: Request, res: Response) => {
    return res.json({ pong: true });
});

/**
 * /user/signup - endpoint
 * AuthValidator.singup - validação dos campos do form
 * AuthController.singup - método de cadastro de usuários
 */
router.post('/user/signup', AuthValidator.singup, AuthController.singup);

export default router;
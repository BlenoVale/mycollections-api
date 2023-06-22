import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";

import User from "../models/user";

const AuthController = {
    signup: async (req: Request, res: Response) => {
        try {
            // verificar a validação feita no AuthValidato.singup
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                return res.status(400).json({
                    error: erros.mapped()
                });
            }

            //Obtem os dados validados no AuthValidato.singup
            const data = matchedData(req);

            //Verifica se o e-mail já está cadastrado na base
            const user = await User.findOne({ email: data.email });
            if (user) {
                return res.status(406).json({
                    error: "E-mail já cadastrado."
                });
            }

            //Converte a senha em Hash
            const passwordHash = await bcrypt.hash(data.password, 10);

            //Gera o token de autorização para logar no sistema
            const payload = (Date.now() + Math.random()).toString();
            const token = await bcrypt.hash(payload, 10);

            //Criação do usuário
            const newUser = new User({
                name: data.name,
                email: data.email,
                passwordHash,
                token
            });
            await newUser.save();

            return res.status(200).json({ message: "Usuário cadastrado com sucesso", token })
        } catch (error) {
            console.log('Erro no AuthController.singup', error);
            return res.status(500).json({ error: "Erro inesperado. Contate o administrador." })
        }
    },
    signin: async (req: Request, res: Response) => {
        try {
            //verificar a validação feita no AuthValidato.signin
            const erros = validationResult(req);
            if (!erros.isEmpty) {
                return res.json({ error: erros.mapped() });
            }

            //Obtem os dados validados no AuthValidato.signin
            const data = matchedData(req);

            //verificar se existe usuário com o e-mail informado
            const user = await User.findOne({ email: data.email });
            if (!user) {
                return res.json({ error: 'E-mail e/ou senha incorretas.' });
            }
            //validar a senha com o hash no banco
            const match = await bcrypt.compare(data.password, user.passwordHash as string);
            if (!match) {
                return res.json({ error: 'E-mail e/ou senha incorretas.' });
            }

            //gerar token de autenticação da sessão
            const payload = (Date.now() + Math.random()).toString();
            const token = await bcrypt.hash(payload, 10);
            //salvar token no registro do usuário
            user.token = token;
            await user.save();

            return res.status(200).json({ token, email: data.email });
        } catch (error) {
            console.log('Erro no AuthController.signin', error);
            return res.status(500).json({ error: "Erro inesperado. Contate o administrador." })
        }
    }
}

export default AuthController;
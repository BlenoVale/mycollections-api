import { checkSchema } from "express-validator";

export const AuthValidator = {
    signup: checkSchema({
        name: {
            trim: true,
            isLength: { options: { min: 2 }, errorMessage: "Nome precisa ter pelo menos 2 caracteres." }
        },
        email: {
            notEmpty: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "E-mail Inválido."
        },
        password: {
            isLength: { options: { min: 4 }, errorMessage: "Senha precisa ter pelo menos 2 caracteres." }
        }
    }),
    signin: checkSchema({
        email: {
            notEmpty: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail Inválido'
        },
        password: {
            isLength: {
                options: { min: 2 }, errorMessage: 'Senha precisa ter pelo menos 2 caracteres.'
            }
        }
    })
}
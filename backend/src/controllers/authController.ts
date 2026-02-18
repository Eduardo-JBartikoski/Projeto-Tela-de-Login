import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from "../lib/prisma";




//                       Registro usuário
export const registerUser = async ( 
    req: Request, res: Response ) => {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.status(400).json({ error: "Usuário e senha obrigatórios" });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if(existingUser) {
        return res.status(400).json({ error: "Usuário já existe" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({ data: { username, password: hashedPassword }
     });

    res.json({ message: "Usuário registrado com sucesso!", user });
};

//                          loginUser
export const loginUser = async ( req: Request, res: Response ) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
        if(!user) 
            return res.status(400).json({ error: "Usuário não encontrado" });
    const isMatch = await bcrypt.compare( password, user.password );
    if(!isMatch)
        return res.status(400).json({ error: "Senha inválida" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: "1h" }); res.json({ message: "Login realizado com sucesso", token });

     }

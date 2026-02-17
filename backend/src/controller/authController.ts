import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users: any[] = [];


//                       Registro usuário
export const registerUser = async ( req: Request, res: Response ) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: "Usuário registrado com sucesso!" });

};

//                          loginUser
export const loginUser = async ( req: Request, res: Response ) => {
    const { username, password } = req.body;
    const user = users.find( u => u.username === username );
        if(!user) 
            return res.status(400).json({ error: "Usuaário não encontrado" });
    const isMatch = await bcrypt.compare( password, user.password );
    if(!isMatch)
        return res.status(400).json({ error: "Senha inválida" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: "1h" }); res.json({ message: "Login realizado com sucesso", token });

     }

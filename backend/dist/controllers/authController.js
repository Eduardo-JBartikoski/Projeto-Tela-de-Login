"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users = [];
//                       Registro usuário
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: "Usuário registrado com sucesso!" });
};
exports.registerUser = registerUser;
//                          loginUser
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user)
        return res.status(400).json({ error: "Usuaário não encontrado" });
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({ error: "Senha inválida" });
    const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login realizado com sucesso", token });
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map
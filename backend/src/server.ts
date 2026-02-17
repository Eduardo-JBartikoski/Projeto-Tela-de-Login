import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

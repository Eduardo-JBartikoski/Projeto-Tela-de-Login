import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../index.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        username,
        password,
      });

      setMessage("Usuário criado com sucesso!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Erro ao cadastrar");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Criar Conta 🚀</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control auth-input"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success w-100 auth-btn">
            Cadastrar
          </button>
        </form>

        {message && (
          <div className="alert alert-info auth-message">
            {message}
          </div>
        )}

        <div className="auth-link">
          Já tem conta? <Link to="/">Fazer login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
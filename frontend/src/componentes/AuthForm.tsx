import React, { useState } from "react";
import api from "../services/api";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();


        try {
            if(isLogin) {
                const response = await api.post("/auth/login", {
                    username,
                    password,
                });

                localStorage.setItem("token", response.data.token);
                setMessage("Login realizado com sucesso!");
            } else {
                const response = await api.post("/auth/register", {
                    username,
                    password,
                });

                setMessage(response.data.message);

            }
        } catch (error: any){
            setMessage(error.response?.data?.error || "Erro na requisição");
        }
        

    };
    return (
        <div className="card p-4 shadow">
      <h3 className="text-center mb-4">
        {isLogin ? "Login" : "Registro"}
      </h3> 
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Usuário</label>
            <input type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            />
        </div>
        
        <div className="mb-3">
            <label className="form-label">Senha</label>
            <input type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             />
        </div>
        <button className="btn btn-primary w-100" type="submit">
            {isLogin ? "Entrar" : "Registrar"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-link"
        onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
        }}
        >
            {isLogin
            ? "Não tem conta? Registrar"
            : "Já tem conta? Login"}
        </button>

      </div>
      {message && (
        <div className="alert alert-info mt-3 text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default AuthForm;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function TelaLogin() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const senhaCorreta = "123";
  const userCorreto = "alex";

  const enviar = (e) => {
    e.preventDefault();

    if (senha === senhaCorreta && usuario === userCorreto) {
      navigate("/telaMenu");
    } else {
      alert("Credenciais incorretas. Tente novamente.");
    }
  };
  

  return (
    <div className="login-page">
      <div className="form">
        <h1 className="title text-primary">Login</h1>
        <form onSubmit={enviar}>
          <input
            type="text"
            placeholder="Usuário"
            name="usuario"
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            name="senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="submit"
          >
            Logar
          </button>
        </form>
      </div>
    </div>
  );
}

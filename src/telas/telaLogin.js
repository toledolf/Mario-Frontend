import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { urlBase12 } from "../utilitarios/definicoes";
import { IMaskInput } from "react-imask";
export default function TelaLogin() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  let podeExibirErro = true;

  const enviar = async (e) => {
    e.preventDefault();

    const usuarioData = {
      usuario: {
        cpf: usuario,
      },
      senha: senha,
    };

    try {
      const resposta = await fetch(urlBase12, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioData),
      });

      if (resposta.ok) {
        const resultado = await resposta.json();

        console.log(resultado);

        if (resultado.status === 200) {
          const userLevel = resultado.userLevel;


          console.log(userLevel);

          if (userLevel === 1) {
            navigate("./telaMenuUser", {
              state: {
                userLevel: userLevel,
              },
            });
          } else if (userLevel === 1000) {
            navigate("./TelaMenu");
          } else {
            console.error("UserLevel desconhecido:", userLevel);
          }
        }
      } else {
        const mensagemErro = document.getElementById("mensagemErro");

        if (podeExibirErro) {
          mensagemErro.innerHTML =
            "Login ou Senha inválidos. Por favor, tente novamente.";

          podeExibirErro = false;

          setTimeout(() => {
            mensagemErro.innerHTML = "";
            podeExibirErro = true;
          }, 2000);
        }
      }
    } catch (erro) {
      console.error("Erro ao processar a requisição:", erro);

      const mensagemErro = document.getElementById("mensagemErro");
      mensagemErro.innerHTML =
        "Erro ao processar a requisição. Por favor, tente novamente.";
    }
  };

  const redirecionar = () => {
    navigate("../FormUsuario");
  };

  return (
    <div className="login-page">
      <div className="form">
        <h1 className="title text-primary">Login</h1>
        <form onSubmit={enviar}>
          <IMaskInput
            mask="000.000.000-00"
            type="text"
            placeholder="Digite seu CPF"
            name="usuario"
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
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
          <br />
          <br />
          <button
            className="btn btn-primary"
            type="button"
            onClick={redirecionar}
          >
            Cadastre-se
          </button>
          <br />
          <br />
          <div
            id="mensagemErro"
            className="text-danger"
          ></div>
        </form>
      </div>
    </div>
  );
}

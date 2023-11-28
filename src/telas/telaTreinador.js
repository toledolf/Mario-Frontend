import React from "react";
import Pagina from "../templates/pagina.js";
import PaginaUser from "../templates/paginaUser";
import { useState, useEffect } from "react";
import { urlBase10 } from "../utilitarios/definicoes";
import { Alert } from "react-bootstrap";
import TabelaTreinador from "../tabelas/TabelaTreinador.js";
import FormTreinador from "../forms/formTreinador.jsx";
import { useUser } from "../userContext";

function TelaTreinador(props) {
  const { userLevel, setUserLevel } = useUser();
  const [mostraTabela, setMostraTabela] = useState(true);
  const [treinadores, setTreinadores] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [treinadorEmEdicao, setTreinadorEmEdicao] = useState({
    id: "",
    nome: "",
    cidade: "",
    email: "",
    telefone: "",
    descricao: "",
  });

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  function prepararParaEdicao(treinador) {
    setModoEdicao(true);
    setTreinadorEmEdicao(treinador);
    setMostraTabela(false);
  }

  function apagarTreinador(treinador) {
    fetch(urlBase10, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(treinador),
    }).then((resposta) => {
      if (resposta.ok) {
        window.alert("O treinador foi deletado com sucesso!");
        window.location.reload();
        return resposta.json();
      } else {
        window.alert(
          "Treinador associado a um time. Não foi possível deletar. Você pode apenas editar o time."
        );
        window.location.reload();
        return resposta.json();
      }
    });
  }

  useEffect(() => {
    const storedUserLevel = localStorage.getItem("userLevel");
    if (storedUserLevel) {
      setUserLevel(parseInt(storedUserLevel, 10));
    }
  }, [setUserLevel]);

  useEffect(() => {
    fetch(urlBase10, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setTreinadores(dados);
        } else {
        }
      });
  }, []);

  return (
    <ComponentePagina>
      <Alert
        variant={"secondary"}
        className="text-center m-3"
      >
        Cadastro de Treinadores
      </Alert>
      {mostraTabela ? (
        <TabelaTreinador
          listaTreinadores={treinadores}
          setTreinadores={setTreinadores}
          mostraTabela={setMostraTabela}
          editarTreinador={prepararParaEdicao}
          apagarTreinador={apagarTreinador}
        />
      ) : (
        <div>
          <FormTreinador
            listaTreinadores={treinadores}
            setTreinadores={setTreinadores}
            editarTreinadores={prepararParaEdicao}
            mostraTabela={setMostraTabela}
            setModoEdicao={setModoEdicao}
            modoEdicao={modoEdicao}
            treinador={treinadorEmEdicao}
          />
        </div>
      )}
    </ComponentePagina>
  );
}

export default TelaTreinador;

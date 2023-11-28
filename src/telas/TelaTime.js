import Pagina from "../templates/pagina.js";
import PaginaUser from "../templates/paginaUser";
import { useState, useEffect } from "react";
import { urlBase7 } from "../utilitarios/definicoes";
import { Alert } from "react-bootstrap";
import TabelaTime from "../tabelas/TabelaTime";
import FormTime from "../forms/formTime.jsx";
import { useUser } from "../userContext";

function TelaTime(props) {
  const { userLevel, setUserLevel } = useUser();
  const [mostraTabela, setMostraTabela] = useState(true);
  const [times, setTimes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [timeEmEdicao, setTimeEmEdicao] = useState({
    id: "",
    nome: "",
    cidade: "",
    fundacao: "",
    treinador: "",
  });

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  function prepararParaEdicao(time) {
    setModoEdicao(true);
    setTimeEmEdicao(time);
    setMostraTabela(false);
  }

  function apagarTime(time) {
    fetch(urlBase7, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(time),
    }).then((resposta) => {
      if (resposta.ok) {
        window.alert("O time foi deletado com sucesso!");
        window.location.reload();
        return resposta.json();
      } else {
        window.alert(
          "Time associado a um agendamento. Não foi possível deletar. Você pode apenas editar o time."
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
    fetch(urlBase7, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setTimes(dados);
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
        Cadastro de Times
      </Alert>
      {mostraTabela ? (
        <TabelaTime
          listaTimes={times}
          setTimes={setTimes}
          mostraTabela={setMostraTabela}
          editarTime={prepararParaEdicao}
          deletarTime={apagarTime}
        />
      ) : (
        <div>
          <FormTime
            listaTimes={times}
            setTimes={setTimes}
            editarTimes={prepararParaEdicao}
            mostraTabela={setMostraTabela}
            setModoEdicao={setModoEdicao}
            modoEdicao={modoEdicao}
            time={timeEmEdicao}
          />
        </div>
      )}
    </ComponentePagina>
  );
}

export default TelaTime;

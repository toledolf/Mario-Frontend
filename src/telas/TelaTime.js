import Pagina from "../templates/pagina.js";
import { useState, useEffect } from "react";
import { urlBase7 } from "../utilitarios/definicoes";
import { Alert } from "react-bootstrap";
import TabelaTime from "../tabelas/TabelaTime";
import FormTime from "../forms/formTime.jsx";

function TelaTime(props) {
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
    <Pagina>
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
    </Pagina>
  );
}

export default TelaTime;

import FormAgendamento from "../forms/FormAgendamento";
import Pagina from "../templates/pagina";
import TabelaAgendamento from "../tabelas/TabelaAgendamento";
import { useState, useEffect } from "react";
import { urlBase } from "../utilitarios/definicoes";
import { Alert, Container } from "react-bootstrap";
import PaginaUser from "../templates/paginaUser";
import { useUser } from "../userContext";

function TelaAgendamento(props) {
  const { userLevel, setUserLevel } = useUser();
  const [mostraTabela, setMostraTabela] = useState(true);
  const [agendamentos, setAgendamentos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [agendamentoEmEdicao, setAgendamentoEmEdicao] = useState({
    codigo: "",
    campo: "",
    data: "",
    horario: "",
  });

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  console.log("agendamento:", userLevel);

  function prepararParaEdicao(agendamento) {
    setModoEdicao(true);
    setAgendamentoEmEdicao(agendamento);
    setMostraTabela(false);
  }

  function apagarAgendamento(agendamento) {
    fetch(urlBase, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agendamento),
    }).then((resposta) => {
      window.alert("Agendamento Deletado com sucesso!!!");
      window.location.reload();
      return resposta.json();
    });
  }

  useEffect(() => {
    const storedUserLevel = localStorage.getItem("userLevel");
    if (storedUserLevel) {
      setUserLevel(parseInt(storedUserLevel, 10));
    }
  }, [setUserLevel]);

  useEffect(() => {
    fetch(urlBase, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setAgendamentos(dados);
        } else {
        }
      });
  }, []);

  return (
      <ComponentePagina>
        <Alert variant={"secondary"} className="text-center m-3">
          Agendamento de Espaço
        </Alert>
        {mostraTabela ? (
          <TabelaAgendamento
            listaAgendamentos={agendamentos}
            setAgendamentos={setAgendamentos}
            mostraTabela={setMostraTabela}
            editarAgendamento={prepararParaEdicao}
            deletarAgendamento={apagarAgendamento}
            modoEdicao={modoEdicao}
          />
        ) : (
          <div>
            <FormAgendamento
              listaAgendamentos={agendamentos}
              setAgendamentos={setAgendamentos}
              editarAgendamentos={prepararParaEdicao}
              mostraTabela={setMostraTabela}
              setModoEdicao={setModoEdicao}
              modoEdicao={modoEdicao}
              agendamento={agendamentoEmEdicao}
            />
          </div>
        )}
      </ComponentePagina>
  );
}

export default TelaAgendamento;

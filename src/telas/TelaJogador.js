import Pagina from "../templates/pagina.js";
import PaginaUser from "../templates/paginaUser";
import { useState, useEffect } from "react";
import { urlBase8 } from "../utilitarios/definicoes";
import { Alert } from "react-bootstrap";
import TabelaJogador from "../tabelas/TabelaJogador";
import FormJogador from "../forms/formJogador";
import { useUser } from "../userContext";

function TelaJogador(props) {
  const { userLevel } = useUser();
  const [mostraTabela, setMostraTabela] = useState(true);
  const [jogadores, setJogadores] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [jogadorEmEdicao, setJogadorEmEdicao] = useState({
    id: "",
    posicao: "",
    time_id: "",
    cpfJogador: "",
  });

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  function prepararParaEdicao(jogador) {
    setModoEdicao(true);
    setJogadorEmEdicao(jogador);
    setMostraTabela(false);
  }

  function apagarJogador(jogador) {
    fetch(urlBase8, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jogador),
    }).then((resposta) => {
      if (resposta.ok) {
        window.alert("O jogador foi deletado com sucesso!");
        window.location.reload();
        return resposta.json();
      } else {
        window.alert(
          "Jogador associado a um agendamento. Não foi possível deletar. Você pode apenas editar o jogador."
        );
        window.location.reload();
        return resposta.json();
      }
    });
  }

  useEffect(() => {
    fetch(urlBase8, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setJogadores(dados);
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
        Registro de Jogadores aos Times
      </Alert>
      {mostraTabela ? (
        <TabelaJogador
          listaJogadores={jogadores}
          setJogadores={setJogadores}
          mostraTabela={setMostraTabela}
          editarJogador={prepararParaEdicao}
          deletarJogador={apagarJogador}
        />
      ) : (
        <div>
          <FormJogador
            listaJogadores={jogadores}
            setJogadores={setJogadores}
            editarJogadores={prepararParaEdicao}
            mostraTabela={setMostraTabela}
            setModoEdicao={setModoEdicao}
            modoEdicao={modoEdicao}
            jogador={jogadorEmEdicao}
          />
        </div>
      )}
    </ComponentePagina>
  );
}

export default TelaJogador;

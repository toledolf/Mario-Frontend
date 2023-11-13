import Pagina from "../templates/pagina.js";
import { useState, useEffect } from "react";
import { urlBase11 } from "../utilitarios/definicoes";
import { Alert } from "react-bootstrap";
import TabelaPlacar from "../tabelas/TabelaPlacar";
import FormPlacar from "../forms/formPlacar";

function TelaPlacar(props) {
  const [mostraTabela, setMostraTabela] = useState(true);
  const [placares, setPlacares] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [placarEmEdicao, setPlacarEmEdicao] = useState({
    id: "",
    time_id_1: "",
    resultado_time_id_1: "",
    time_id_2: "",
    resultado_time_id_2: "",
    data: "",
  });

  function prepararParaEdicao(placar) {
    setModoEdicao(true);
    setPlacarEmEdicao(placar);
    setMostraTabela(false);
  }

  function apagarPlacar(placar) {
    fetch(urlBase11, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(placar),
    }).then((resposta) => {
      if (resposta.ok) {
        window.alert("O placar foi deletado com sucesso!");
        window.location.reload();
        return resposta.json();
      } else {
        window.alert(
          "Placar associado a um agendamento. Não foi possível deletar. Você pode apenas editar o placar."
        );
        window.location.reload();
        return resposta.json();
      }
    });
  }

  useEffect(() => {
    fetch(urlBase11, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setPlacares(dados);
        } else {
          // se for um objeto, deu erro
        }
      });
  }, []);

  return (
    <Pagina>
      <Alert
        variant={"secondary"}
        className="text-center m-3"
      >
        Cadastro de Placares
      </Alert>
      {mostraTabela ? (
        <TabelaPlacar
          listaPlacares={placares}
          setPlacares={setPlacares}
          mostraTabela={setMostraTabela}
          editarPlacar={prepararParaEdicao}
          deletarPlacar={apagarPlacar}
        />
      ) : (
        <div>
          <FormPlacar
            listaPlacares={placares}
            setPlacares={setPlacares}
            editarPlacares={prepararParaEdicao}
            mostraTabela={setMostraTabela}
            setModoEdicao={setModoEdicao}
            modoEdicao={modoEdicao}
            placar={placarEmEdicao}
          />
        </div>
      )}
    </Pagina>
  );
}

export default TelaPlacar;

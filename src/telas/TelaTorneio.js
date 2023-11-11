import React from "react";

import Pagina from "../templates/pagina.js";
import { useState, useEffect } from "react";
import { urlBase6 } from "../utilitarios/definicoes.js";
import { Alert } from "react-bootstrap";

import TabelaTorneio from "../tabelas/TabelaTorneio.js";

import FormTorneio from "../forms/formTorneio.jsx";

function TelaTorneio(props) {
  const [mostraTabela, setMostraTabela] = useState(true);
  const [torneios, setTorneios] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [torneioEmEdicao, setTorneioEmEdicao] = useState({
    id: "",
    modalidade: "",
    numEquipes: "",
    data: "",
    cpfUsuario: "",
  });

  function prepararParaEdicao(torneio) {
    setModoEdicao(true);
    setTorneioEmEdicao(torneio);
    setMostraTabela(false);
  }

  /* function apagarCampo(campo) {
    fetch(urlBase3, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campo),
    }).then((resposta) => {
      if (resposta.ok) {
        window.alert("O campo foi deletado com sucesso!");
        window.location.reload();
        return resposta.json();
      } else {
        window.alert(
          "Campo associado a um agendamento. Não foi possível deletar. Você pode apenas editar o campo."
        );
        window.location.reload();
        return resposta.json();
      }
    });
  } */

  useEffect(() => {
    fetch(urlBase6, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setTorneios(dados);
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
        Cadastro de Agendamento de Torneios
      </Alert>
      {mostraTabela ? (
        <TabelaTorneio
          listaTorneios={torneios}
          setTorneios={setTorneios}
          mostraTabela={setMostraTabela}
          /* editarCampo={prepararParaEdicao} */
          /* deletarCampo={apagarCampo} */
        />
      ) : (
        <div>
          <FormTorneio
            listaTorneios={torneios}
            setTorneios={setTorneios}
            editarTorneios={prepararParaEdicao}
            mostraTabela={setMostraTabela}
            setModoEdicao={setModoEdicao}
            modoEdicao={modoEdicao}
            torneio={torneioEmEdicao}
          />
        </div>
      )}
    </Pagina>
  );
}

export default TelaTorneio;

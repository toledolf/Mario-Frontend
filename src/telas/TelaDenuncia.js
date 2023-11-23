import React from "react";

import Pagina from "../templates/pagina.js";
import { useState, useEffect } from "react";
import { urlBase5 } from "../utilitarios/definicoes.js";
import { Alert } from "react-bootstrap";

import TabelaDenuncia from "../tabelas/TabelaDenuncia.js";

import FormDenuncia from "../forms/FormDenuncia.jsx";

function TelaDenuncia(props) {
  const [mostraTabela, setMostraTabela] = useState(true);
  const [denuncias, setDenuncias] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [denunciaEmEdicao, setDenunciaEmEdicao] = useState({
    id: "",
    data : "",
    horario : "",
    nomeInfrator : "",
    dadosDenuncia : "",
    campoSelecionado : "",
    cpfUsuario : "",
  });

  function prepararParaEdicao(denuncia) {
    setModoEdicao(true);
    setDenunciaEmEdicao(denuncia);
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
    fetch(urlBase5, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setDenuncias(dados);
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
        Cadastro de Denúncias
      </Alert>
      {mostraTabela ? (
        <TabelaDenuncia
          listaDenuncias={denuncias}
          setDenuncias={setDenuncias}
          mostraTabela={setMostraTabela}
          /* editarCampo={prepararParaEdicao} */
          /* deletarCampo={apagarCampo} */
        />
      ) : (
        <div>
          <FormDenuncia
            listaDenuncias={denuncias}
            setDenuncias={setDenuncias}
            editarCampos={prepararParaEdicao}
            mostraTabela={setMostraTabela}
            setModoEdicao={setModoEdicao}
            modoEdicao={modoEdicao}
            denuncia={denunciaEmEdicao}
          />
        </div>
      )}
    </Pagina>
  );
}

export default TelaDenuncia;

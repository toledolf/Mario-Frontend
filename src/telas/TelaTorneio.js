import React from "react";
import Pagina from "../templates/pagina.js";
import PaginaUser from "../templates/paginaUser";
import { useState, useEffect } from "react";
import { urlBase6 } from "../utilitarios/definicoes.js";
import { Alert } from "react-bootstrap";
import TabelaTorneio from "../tabelas/TabelaTorneio.js";
import FormTorneio from "../forms/formTorneio.jsx";
import { useUser } from "../userContext";

function TelaTorneio(props) {
  const { userLevel } = useUser();
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

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  function prepararParaEdicao(torneio) {
    setModoEdicao(true);
    setTorneioEmEdicao(torneio);
    setMostraTabela(false);
  }

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
    <ComponentePagina>
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
    </ComponentePagina>
  );
}

export default TelaTorneio;

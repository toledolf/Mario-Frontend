import React from "react";
import Pagina from "../templates/pagina.js";
import { useState, useEffect } from "react";
import { urlBase5 } from "../utilitarios/definicoes.js";
import { Alert, Container } from "react-bootstrap";
import TabelaDenuncia from "../tabelas/TabelaDenuncia.js";
import FormDenuncia from "../forms/FormDenuncia.jsx";
import PaginaUser from "../templates/paginaUser.js";
import { useUser } from "../userContext";

function TelaDenuncia(props) {
  const { userLevel } = useUser();
  const [mostraTabela, setMostraTabela] = useState(true);
  const [denuncias, setDenuncias] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [denunciaEmEdicao, setDenunciaEmEdicao] = useState({
    id: "",
    data: "",
    horario: "",
    nomeInfrator: "",
    dadosDenuncia: "",
    campoSelecionado: "",
    cpfUsuario: "",
  });

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  function prepararParaEdicao(denuncia) {
    setModoEdicao(true);
    setDenunciaEmEdicao(denuncia);
    setMostraTabela(false);
  }

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
    <ComponentePagina>
      <Container className="border">
        <Alert variant={"secondary"} className="text-center m-3">
          Cadastro de Denúncias
        </Alert>
        {mostraTabela ? (
          <TabelaDenuncia
            listaDenuncias={denuncias}
            setDenuncias={setDenuncias}
            mostraTabela={setMostraTabela}
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
      </Container>
    </ComponentePagina>
  );
}

export default TelaDenuncia;

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
  const { userLevel, setUserLevel } = useUser();
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

  useEffect(() => {
    const storedUserLevel = localStorage.getItem("userLevel");
    if (storedUserLevel) {
      setUserLevel(parseInt(storedUserLevel, 10));
    }
  }, [setUserLevel]);

  useEffect(() => {
    fetch(urlBase5, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setDenuncias(dados);
        } else {
          // Trate aqui se necessário
        }
      });
  }, []);

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  function prepararParaEdicao(denuncia) {
    setModoEdicao(true);
    setDenunciaEmEdicao(denuncia);
  }

  return (
    <ComponentePagina>
      <Container>
        <Alert
          variant={"secondary"}
          className="text-center m-3"
        >
          Cadastro de Denúncias
        </Alert>
        {userLevel !== 1 && (
          <TabelaDenuncia
            listaDenuncias={denuncias}
            setDenuncias={setDenuncias}
            prepararParaEdicao={prepararParaEdicao}
          />
        )}
        <FormDenuncia
          listaDenuncias={denuncias}
          setDenuncias={setDenuncias}
          editarCampos={prepararParaEdicao}
          setModoEdicao={setModoEdicao}
          modoEdicao={modoEdicao}
          denuncia={denunciaEmEdicao}
        />
      </Container>
    </ComponentePagina>
  );
}

export default TelaDenuncia;

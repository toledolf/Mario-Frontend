import Pagina from "../templates/pagina.js";
import PaginaUser from "../templates/paginaUser.js";
import { useState, useEffect } from "react";
import { urlBase3 } from "../utilitarios/definicoes";
import { Alert } from "react-bootstrap";
import TabelaCampo from "../tabelas/TabelaCampo";
import FormCampo from "../forms/FormCampo";
import { useUser } from "../userContext";



function TelaCampo(props) {
  const { userLevel, setUserLevel } = useUser();

  const [mostraTabela, setMostraTabela] = useState(true);
  const [campos, setCampos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [campoEmEdicao, setCampoEmEdicao] = useState({
    id: "",
    corReferencial: "",
    descricao: "",
  });

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;


  function prepararParaEdicao(campo) {
    setModoEdicao(true);
    setCampoEmEdicao(campo);
    setMostraTabela(false);
  }

  function apagarCampo(campo) {
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
  }

  useEffect(() => {
    const storedUserLevel = localStorage.getItem("userLevel");
    if (storedUserLevel) {
      setUserLevel(parseInt(storedUserLevel, 10));
    }
  }, [setUserLevel]);

  useEffect(() => {
    fetch(urlBase3, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setCampos(dados);
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
        Agendamento de Espaço
      </Alert>
      {mostraTabela ? (
        <TabelaCampo
          listaCampos={campos}
          setCampos={setCampos}
          mostraTabela={setMostraTabela}
          editarCampo={prepararParaEdicao}
          deletarCampo={apagarCampo}
        />
      ) : (
        <div>
          <FormCampo
            listaCampos={campos}
            setCampos={setCampos}
            editarCampos={prepararParaEdicao}
            mostraTabela={setMostraTabela}
            setModoEdicao={setModoEdicao}
            modoEdicao={modoEdicao}
            campo={campoEmEdicao}
          />
        </div>
      )}
    </ComponentePagina>
  );
}

export default TelaCampo;

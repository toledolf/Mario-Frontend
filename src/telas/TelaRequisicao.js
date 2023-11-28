import FormRequisicao from "../forms/FormRequisicao";
import Pagina from "../templates/pagina";
import TabelaRequisicao from "../tabelas/TabelaRequisicao";
import { useState, useEffect } from "react";
import { urlBase13 } from "../utilitarios/definicoes";
import { Alert } from "react-bootstrap";
import PaginaUser from "../templates/paginaUser";
import { useUser } from "../userContext";

function TelaRequisicao(props) {
  const { userLevel, setUserLevel } = useUser();
  const [requisicoes, setRequisicoes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [requisicaoEmEdicao, setRequisicaoEmEdicao] = useState({
    id: "",
    user_cpf: "",
    requisicao: "",
    data: "",
  });

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  function prepararParaEdicao(requisicao) {
    setModoEdicao(true);
    setRequisicaoEmEdicao(requisicao);
  }

  function apagarRequisicao(requisicao) {
    fetch(urlBase13, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requisicao),
    })
      .then((resposta) => {
        window.alert("Requisição Deletada com sucesso!!!");
        window.location.reload();
        return resposta.json();
      })
      .catch((error) => {
        console.error(error);
        window.alert(error.message);
      });
  }

  useEffect(() => {
    const storedUserLevel = localStorage.getItem("userLevel");
    if (storedUserLevel) {
      setUserLevel(parseInt(storedUserLevel, 10));
    }
  }, [setUserLevel]);

  useEffect(() => {
    fetch(urlBase13, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setRequisicoes(dados);
        } else {
          // Trate aqui se necessário
        }
      });
  }, []);

  return (
    <ComponentePagina>
      <Alert
        variant={"secondary"}
        className="text-center m-3"
      >
        Tela de Requisição
      </Alert>
      {userLevel !== 1 && (
        <TabelaRequisicao
          listaRequisicoes={requisicoes}
          setRequisicoes={setRequisicoes}
          prepararParaEdicao={prepararParaEdicao}
          deletarRequisicao={apagarRequisicao}
          modoEdicao={modoEdicao}
        />
      )}
      <FormRequisicao
        listaRequisicoes={requisicoes}
        setRequisicoes={setRequisicoes}
        editarRequisicoes={prepararParaEdicao}
        setModoEdicao={setModoEdicao}
        modoEdicao={modoEdicao}
        requisicao={requisicaoEmEdicao}
      />
    </ComponentePagina>
  );
}

export default TelaRequisicao;

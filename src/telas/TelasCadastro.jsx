import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import TabelaUsuarios from "../tabelas/TabelaUsuarios";
import FormUsuarios from "../forms/FormUsuario";
import Pagina from "../templates/pagina";
import PaginaUser from "../templates/paginaUser";
import { useUser } from "../userContext";
import { urlBase2 } from "../utilitarios/definicoes";

export default function TelaCadastro() {
  const { userLevel, setUserLevel } = useUser();
  const [exibirTabela, setExibirTabela] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioEdicao, setUsuarioEdicao] = useState({
    cpf: "",
    senha: "",
    userLevel: "",
    nome: "",
    dataNasc: "",
    email: "",
    tel: "",
    sexo: "",
    cidade: "",
    uf: "",
    treinador: "",
    jogador: "",
  });

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  function prepararTela(usuario) {
    setModoEdicao(true);
    setUsuarioEdicao(usuario);
    setExibirTabela(false);
  }

  function deletarUsuario(usuario) {
    fetch(urlBase2, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((resposta) => {
        window.alert("O usuário selecionado foi deletado com sucesso!");
        return resposta.json();
      })
      .then(window.location.reload());
  }

  useEffect(() => {
    const storedUserLevel = localStorage.getItem("userLevel");
    if (storedUserLevel) {
      setUserLevel(parseInt(storedUserLevel, 10));
    }
  }, [setUserLevel]);

  useEffect(() => {
    fetch(urlBase2, {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setUsuarios(dados);
        } else {
        }
      });
  }, []);

  return (
    <Container className="border">
      <Alert variant="success" className="text-center">
        Cadastro de Usuários no Sistema
      </Alert>
      <ComponentePagina>
        {exibirTabela ? (
          <TabelaUsuarios
            listaUsuarios={usuarios}
            setUsuarios={setUsuarios}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarUsuario}
          />
        ) : (
          <FormUsuarios
            listaUsuarios={usuarios}
            exibirTabela={setExibirTabela}
            setUsuarios={setUsuarios}
            editar={prepararTela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            usuario={usuarioEdicao}
          />
        )}
      </ComponentePagina>
    </Container>
  );
}

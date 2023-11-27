import FormDoacao from "../forms/FormDoacao";
import Pagina from "../templates/pagina";
import TabelaDoacao from "../tabelas/TabelaDoacao";
import PaginaUser from "../templates/paginaUser";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase4 } from "../utilitarios/definicoes";
import { useUser } from "../userContext";

export default function TelaDoacao(props) {
  const { userLevel } = useUser();
  const [exibirTabela, setExibirTabela] = useState(true);
  const [doacoes, setDoacoes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioEdicao, setUsuarioEdicao] = useState({
    id: "",
    itemDoado: "",
    valorDoado: "",
    cpfUsuario: "",
  });

  const ComponentePagina = userLevel === 1 ? PaginaUser : Pagina;

  function prepararTela(doacao) {
    setModoEdicao(true);
    setUsuarioEdicao(doacao);
    setExibirTabela(false);
  }

  function deletarUsuario(doacao) {
    fetch(urlBase4, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doacao),
    })
      .then((resposta) => {
        window.alert("O item selecionado foi deletado com sucesso!");
        return resposta.json();
      })
      .then(window.location.reload());
  }

  useEffect(() => {
    fetch(urlBase4, {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setDoacoes(dados);
        } else {
        }
      });
  }, []);

  return (
    <ComponentePagina>
      <Container className="border">
        <Alert variant="success" className="text-center">
          Registre sua doação!
        </Alert>
        {exibirTabela ? (
          <TabelaDoacao
            listaDoacoes={doacoes}
            setDoacoes={setDoacoes}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarUsuario}
          />
        ) : (
          <div>
            <FormDoacao
              listaDoacoes={doacoes}
              exibirTabela={setExibirTabela}
              setDoacoes={setDoacoes}
              editar={prepararTela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              doacao={usuarioEdicao}
            />
          </div>
        )}
      </Container>
    </ComponentePagina>
  );
}

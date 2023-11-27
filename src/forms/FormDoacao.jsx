import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container, Alert } from "react-bootstrap";
import { urlBase2, urlBase4 } from "../utilitarios/definicoes";
import BarraBusca2 from "./BarraBusca2";
import { IMaskInput } from "react-imask";

export default function FormDoacao(props) {
  const [validado, setValidado] = useState(false);
  const [doacao, setDoacao] = useState(props.doacao);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setDoacao({ ...doacao, [id]: valor });
  }

  function manipulaSumissao(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const usuario = {
        cpf: usuarioSelecionado.cpf,
        nome: usuarioSelecionado.nome,
      };
      const dadosEnvio = {
        itemDoado: doacao.itemDoado,
        valorDoado: doacao.valorDoado,
        cpf: doacao.cpfUsuario,
        usuario: usuario,
      };
      if (!props.modoEdicao) {
        fetch(urlBase4, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("A doacao foi registrada no banco de dados!");
          window.location.reload();
          return resposta.json();
        });
      } else {
        dadosEnvio.id = doacao.id;
        fetch(urlBase4, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("A doacao foi atualizada no banco de dados!");
          window.location.reload();
          return resposta.json();
        });
      }
      setValidado(false);
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  const [mostrarDicas, setMostrarDicas] = useState(false);

  const toggleDicas = () => {
    setMostrarDicas((prevMostrarDicas) => !prevMostrarDicas);
  };

  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlBase2, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data from API:", data);
        setListaUsuarios(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Form
        noValidate
        validated={validado}
        onSubmit={manipulaSumissao}
      >
        <Row>
        <Col>
          <Button onClick={toggleDicas}>
            {mostrarDicas ? "Esconder Dicas" : "Mostrar Dicas"}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="mt-3">
          {mostrarDicas && (
            <Alert variant="info">
              <p>Dica 1: Insira SEU usuário ou use o CPF 000.000.000-00 para fazer uma doação anônima.</p>
              <p>Dica 2: Insira uma breve descrição do Item ou adicione um valor.</p>
            </Alert>
          )}
        </Col>
      </Row>
        <Row>
          <Form.Group
            className="mb-3"
            controlId="formDoacao.codigo"
          >
            <Form.Label>Usuário:</Form.Label>
            <BarraBusca2
              placeHolder={"Informe um Usuário"}
              dados={listaUsuarios}
              campoChave={"cpf"}
              campoBusca={"nome"}
              funcaoSelecao={(usuarioSelecionado) => {
                setUsuarioSelecionado(usuarioSelecionado);
                setDoacao({ ...doacao, usuario: usuarioSelecionado });
              }}
              valor={""}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira o Usuário!
            </Form.Control.Feedback>
            <Form.Control
              type="text"
              placeholder="Nome do Usuário"
              value={usuarioSelecionado?.nome || ""}
              onChange={(e) => {}}
            />
            <Form.Control
              type="text"
              placeholder="CPF do Usuário"
              value={usuarioSelecionado?.cpf || ""}
              onChange={(e) => {}}
            />
          </Form.Group>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Item a ser Doado</Form.Label>
              <Form.Control
                placeholder="Bola de capotão"
                value={doacao.itemDoado}
                id="itemDoado"
                onChange={manipularMudanca}
              />
              {(inputProps) => <Form.Control {...inputProps} />}

              <Form.Control.Feedback type="invalid">
                Por favor, informe o item!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Valor a ser doado</Form.Label>
              <Form.Control
                as={IMaskInput}
                mask={"000.00"}
                type="text"
                placeholder="R$100"
                value={doacao.valorDoado}
                id="valorDoado"
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por getileza, informe o valor da doação!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button type="submit">Gravar</Button> {<p></p>}
            <Button
              type="button"
              onClick={() => {
                props.exibirTabela(true);
              }}
            >
              Voltar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

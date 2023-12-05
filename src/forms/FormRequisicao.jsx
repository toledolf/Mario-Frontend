import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { urlBase13, urlBase2 } from "../utilitarios/definicoes";
import BarraBusca from "./BarraBusca.js";
import { IMaskInput } from "react-imask";

function FormRequisicao(props) {
  const [validado, setValidado] = useState(false);
  const [requisicao, setRequisicao] = useState(props.requisicao);

  function manipularInput(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setRequisicao({ ...requisicao, [id]: valor });
  }

  function manipularInput(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setRequisicao({ ...requisicao, [id]: valor });
  }

  function manipularEnvio(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const dadosParaEnvio = {
        usuario: {
          user_cpf: usuarioSelecionado.cpf,
        },
        requisicao: requisicao.requisicao,
        data: requisicao.data,
      };

      if (!props.modoEdicao) {
        fetch(urlBase13, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Requisicao cadastrada com sucesso!!!");
              window.location.reload();
              return resposta.json();
            } else {
              window.alert("Usuário não encontrado!!!");
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert(error.message);
          });
      } else {
        dadosParaEnvio.id = requisicao.id;
        fetch(urlBase13, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        }).then((resp) => {
          window.alert("Requisicao Atualizada com Sucesso!!!");
          window.location.reload();
          return resp.json();
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
  const [ListaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    fetch(urlBase2)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setListaUsuarios(dados);
      });
  }, []);

  return (
    <Form
      noValidate
      validated={validado}
      onSubmit={manipularEnvio}
    >
      <Container className="mt-4 mb-4 d-flex justify-content-center">
        <h1>Registar uma Requisição</h1>
      </Container>
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
              <p>
                Dica 1: Selecione o SEU usuário para registrar uma requisição.
              </p>
              <p>Dica 2: Descrava sua requisição.</p>
              <p>Dica 3: Informe a data da requisição.</p>
            </Alert>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Usuário:</Form.Label>
            <BarraBusca
              placeHolder={"Informe um Usuário"}
              dados={ListaUsuarios}
              campoChave={"cpf"}
              campoBusca={"nome"}
              funcaoSelecao={setUsuarioSelecionado}
              valor={""}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira o Usuário!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Código:</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="O código será gerado automaticamente."
              value={requisicao.id}
              id="codigo"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group
            className="mb-3"
            controlId="dataNasc"
          >
            <Form.Label style={{ textAlign: "center" }}>Descreva a Infração:</Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder="Descreva a Infração. Seja objetivo!"
              style={{ width: "600px", height: "180px", margin: "auto" }}
              value={requisicao.requisicao}
              id="requisicao"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe a data!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Informe uma Data:</Form.Label>
            <Form.Control
              as={IMaskInput}
              mask="00/00/0000"
              type="text"
              placeholder="00/00/0000"
              value={requisicao.data}
              id="data"
              onChange={manipularInput}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira uma data!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Row>
          <div>
            <br />
          </div>
        </Row>

        <Row>
          <Col>
            <Button type="submit">Enviar informações</Button>
            <div>
              <br />
            </div>
            {/* <Button
              type="button"
              onClick={() => {
                props.mostraTabela(true);
              }}
            >
              Voltar
            </Button> */}
          </Col>
        </Row>
      </Row>
    </Form>
  );
}

export default FormRequisicao;

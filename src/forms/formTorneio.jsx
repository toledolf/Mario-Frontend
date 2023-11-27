import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { urlBase6, urlBase2 } from "../utilitarios/definicoes";
import BarraBusca from "./BarraBusca.js";
import { IMaskInput } from "react-imask";

function FormTorneio(props) {
  const [validado, setValidado] = useState(false);
  const [torneio, setTorneio] = useState(props.torneio);

  function manipularInput(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setTorneio({ ...torneio, [id]: valor });
  }

  function manipularEnvio(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const usuario = {
        cpf: usuarioSelecionado.cpf,
        nome: usuarioSelecionado.nome,
      };

      const dadosParaEnvio = {
        modalidade: torneio.modalidade,
        numEquipes: torneio.numEquipes,
        data: torneio.data,
        usuario: usuario,
      };
      if (!props.modoEdicao) {
        fetch(urlBase6, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Torneio cadastrado com sucesso!!!");
              window.location.reload();
              return resposta.json();
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert(error.message);
          });
      } else {
        fetch(urlBase6, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Torneio atualizado com sucesso!!!");
              window.location.reload();
              return resposta.json();
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert(error.message);
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
        <h1>Cadastro de Agendamento de Torneios</h1>
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
              <p>Dica 1: Esse formulário representa uma intenção de realidade de torneio.</p>
              <p>Dica 2: Preencha os dados para serem avaliados pela coordenação.</p>
            </Alert>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Usuário:</Form.Label>
            <BarraBusca
              placeHolder={"Informe o Usuário"}
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
            <Form.Label>Id:</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="O id será gerado automaticamente."
              value={torneio.id}
              id="id"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Selecione uma Modalidade:</Form.Label>
          <Form.Select
            aria-label="Selecione uma Modalidade"
            value={torneio.modalidade}
            id="modalidade"
            onChange={manipularInput}
          >
            <option value="Erro! Seleção não efetivada!">
              Selecione uma Modalidade...
            </option>
            <option value="Futebol (Quadra)">1 - Quadra (Futebol)</option>
            <option value="Futebol (Gramado)">2 - Gramado (Futebol)</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Por favor, informe uma Modalidade!
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Group
            className="mb-3"
            controlId="data"
          >
            <Form.Label>Data do Torneio:</Form.Label>
            <Form.Control
              as={IMaskInput}
              mask={"00/00/0000"}
              placeholder="00/00/0000"
              required
              type="text"
              value={torneio.data}
              id="data"
              onChange={manipularInput}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, informe a data!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group
            className="mb-3"
            controlId="dataNasc"
          >
            <Form.Label>Número de Equipes:</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Digite aqui..."
              min={4}
              max={8}
              value={torneio.numEquipes}
              id="numEquipes"
              onChange={manipularInput}
              isInvalid={validado && !/[468]/.test(torneio.numEquipes)}
            />
            <Form.Text className="text-muted">
              O número de equipes deve ser 4, 6 ou 8
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um número válido de equipes!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Row>
          <Col>
            <Button type="submit">Enviar informações</Button>
            <div>
              <br />
            </div>
            <Button
              type="button"
              onClick={() => {
                props.mostraTabela(true);
              }}
            >
              Voltar
            </Button>
          </Col>
        </Row>
      </Row>
    </Form>
  );
}

export default FormTorneio;

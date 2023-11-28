import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { urlBase5, urlBase2 } from "../utilitarios/definicoes";
import BarraBusca from "./BarraBusca.js";
import { IMaskInput } from "react-imask";

function FormDenuncia(props) {
  const [validado, setValidado] = useState(false);
  const [denuncia, setDenuncia] = useState(props.denuncia);

  function manipularInput(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setDenuncia({ ...denuncia, [id]: valor });
  }

  function manipularEnvio(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const usuario = {
        cpf: usuarioSelecionado.cpf,
        nome: usuarioSelecionado.nome,
      };

      const dadosParaEnvio = {
        data: denuncia.data,
        horario: denuncia.horario,
        campoSelecionado: denuncia.campoSelecionado,
        nomeInfrator: denuncia.nomeInfrator,
        dadosDenuncia: denuncia.dadosDenuncia,
        usuario: usuario,
      };
      if (!props.modoEdicao) {
        fetch(urlBase5, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Denuncia cadastrada com sucesso!!!");
              window.location.reload();
              return resposta.json();
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert(error.message);
          });
      } else {
        fetch(urlBase5, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Denuncia atualizada com sucesso!!!");
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
        <h1>Cadastro de Denúncias</h1>
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
              <p>Dica 1: Use o CPF 000.000.000-00 para uma denúnica Anônima.</p>
              <p>Dica 2: Selecione o campo, data e o horário da ocorrência .</p>
              <p>Dica 3: Informe o possível nome do Infrator.</p>
              <p>Após o envio, a adminstração irá analisar a denúncia.</p>
            </Alert>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-4">
            <Form.Label>Usuário:</Form.Label>
            <BarraBusca
              placeHolder={
                "Informe um Usuário ou selecione o CPF 000.000.000-00 para uma denúncia Anônima"
              }
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
        <Row/>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              disabled
              type="number"
              placeholder="O id será gerado automaticamente."
              value={denuncia.id}
              id="id"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label>Selecione um Campo:</Form.Label>
          <Form.Select
            aria-label="Selecione um Campo"
            value={denuncia.campoSelecionado}
            id="campoSelecionado"
            onChange={manipularInput}
          >
            <option value="Erro! Seleção não efetivada!">Selecione um Campo...</option>
            <option value="Azul">1 - Azul</option>
            <option value="Verde">2 - Verde</option>
            <option value="Roxo">3 - Roxo</option>
            <option value="Amarelo">4 - Amarelo</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Por favor, informe um Campo!
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Group
            className="mb-3"
            controlId="dataNasc"
          >
            <Form.Label>Data do Ocorrido:</Form.Label>
            <Form.Control
              as={IMaskInput}
              mask={"00/00/0000"}
              placeholder="00/00/0000"
              required
              type="text"
              value={denuncia.data}
              id="data"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe a data!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group
            className="mb-3"
            controlId="dataNasc"
          >
            <Form.Label>Horário do Ocorrido:</Form.Label>
            <Form.Control
              required
              type="time"
              placeholder="00:00"
              value={denuncia.horario}
              id="horario"
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
            <Form.Label>Nome do Infrator:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nome do Infrator"
              value={denuncia.nomeInfrator}
              id="nomeInfrator"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe a data!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
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
              value={denuncia.dadosDenuncia}
              id="dadosDenuncia"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe a data!
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

export default FormDenuncia;

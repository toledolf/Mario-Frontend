import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { urlBase5, urlBase2 } from "../utilitarios/definicoes";
import BarraBusca from "./BarraBusca.js";

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
        <h1>Cadastro de Denuncias</h1>
      </Container>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Usuário:</Form.Label>
            <BarraBusca
              placeHolder={
                "Informe um Usuário ou selecione o CPF 000.000.000-00 para uma denuncia Anônima"
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
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Id:</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="O id será gerado automaticamente."
              value={denuncia.id}
              id="id"
            />
          </Form.Group>
        </Col>

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
              required
              type="date"
              value={denuncia.data}
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
            <Form.Label>Data do Ocorrido:</Form.Label>
            <Form.Control
              required
              type="time"
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
              value={denuncia.nomeInfrator}
              id="nomeInfrator"
              onChange={manipularInput}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, informe a data!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Row>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="dataNasc"
            >
              <Form.Label>Descreva a Infração:</Form.Label>
              <Form.Control
                required
                type="textarea"
                style={{ width: "300px", height: "150px" }}
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
      </Row>

      <Row>
        <Row>
          <Col md={5}>
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

export default FormDenuncia;

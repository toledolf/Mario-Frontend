import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { urlBase7, urlBase2, urlBase10 } from "../utilitarios/definicoes";
import CaixaSelecao from "./CaixaSelecao";

function FormTime(props) {
  const [validado, setValidado] = useState(false);
  const [time, setTime] = useState(props.time);

  function manipularInput(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setTime({ ...time, [id]: valor });
  }

  function manipularEnvio(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const treinador = {
        id: treinadorSelecionado.id,
      };

      const dadosParaEnvio = {
        nome: time.nome,
        cidade: time.cidade,
        fundacao: time.fundacao,
        treinador: treinador,
      };
      if (!props.modoEdicao) {
        fetch(urlBase7, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Time cadastrado com sucesso!!!");
              window.location.reload();
              return resposta.json();
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert(error.message);
          });
      } else {
        dadosParaEnvio.id = time.id;
        fetch(urlBase7, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        }).then((resp) => {
          window.alert("Time Atualizado com Sucesso!!!");
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

  const [treinadorSelecionado, setTreinadorSelecionado] = useState({});
  const [listaTreinadores, setListaTreinadores] = useState([]);

  useEffect(() => {
    fetch(urlBase2)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setListaTreinadores(dados);
      });
  }, []);

  return (
    <Form
      noValidate
      validated={validado}
      onSubmit={manipularEnvio}
    >
      <Container className="mt-4 mb-4 d-flex justify-content-center">
        <h1>Cadastro de Times</h1>
      </Container>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Id:</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="O id será gerado automaticamente."
              value={time.id}
              id="id"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Digite o nome do Time:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Nome do Time"
              value={time.nome}
              id="nome"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira uma Situação!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Digite a Cidade:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Cidade"
              value={time.cidade}
              id="cidade"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira uma Cidade!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Digite a Fundação:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="date"
              placeholder="Fundacao"
              value={time.fundacao}
              id="fundacao"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira a data de Fundação!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Selecione um Treinador:</Form.Label>
          <CaixaSelecao
            urlBase3={urlBase10}
            campoChave="id"
            campoSelecao={"nome"}
            dados={listaTreinadores}
            funccaoSelecao={setTreinadorSelecionado}
          ></CaixaSelecao>
          <Form.Control.Feedback type="invalid">
            Por favor, informe um Treinador!
          </Form.Control.Feedback>
        </Col>
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

export default FormTime;

import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { urlBase11 } from "../utilitarios/definicoes";
import { urlBase7 } from "../utilitarios/definicoes";
import CaixaSelecao from "./CaixaSelecao";
import { IMaskInput } from "react-imask";

function FormPlacar(props) {
  const [validado, setValidado] = useState(false);
  const [placar, setPlacar] = useState(props.placar);

  function manipularInput(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setPlacar({ ...placar, [id]: valor });
  }

  function manipularEnvio(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const time_1 = {
        time_id_1: timeSelecionado.id,
      };

      const time_2 = {
        time_id_2: timeSelecionado.id,
      };
      const dadosParaEnvio = {
        time_id_1: time_1.id,
        resultado_time_id_1: placar.resultado_time_id_1,
        time_id_2: time_2.id,
        resultado_time_id_2: placar.resultado_time_id_2,
        data: placar.data,
      };
      if (!props.modoEdicao) {
        fetch(urlBase11, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Placar cadastrado com sucesso!!!");
              window.location.reload();
              console.log(resposta);
              return resposta.json();
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert(error.message);
          });
      } else {
        dadosParaEnvio.id = placar.id;
        fetch(urlBase11, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        }).then((resp) => {
          window.alert("Placar Atualizado com Sucesso!!!");
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

  const [timeSelecionado, setTimeSelecionado] = useState({});
  const [listaTimes, setListaTimes] = useState([]);

  useEffect(() => {
    fetch(urlBase7)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setListaTimes(dados);
      });
  }, []);

  return (
    <Form
      noValidate
      validated={validado}
      onSubmit={manipularEnvio}
    >
      <Container className="mt-4 mb-4 d-flex justify-content-center">
        <h1>Cadastro de Placares dos Jogos</h1>
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
              <p>Dica 1: Insira os times e os gols de cada.</p>
              <p>Dica 2: Selecione a data do jogo.</p>
            </Alert>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              disabled
              type="number"
              placeholder="O id será gerado automaticamente."
              value={placar.id}
              id="id"
            />
          </Form.Group>
        </Col>
        <Row />

        <Col>
          <Form.Label>Selecione o Time 1:</Form.Label>
          <CaixaSelecao
            urlBase3={urlBase7}
            campoChave="id"
            campoSelecao={"nome"}
            dados={listaTimes}
            funccaoSelecao={setTimeSelecionado}
          ></CaixaSelecao>
          <Form.Control.Feedback type="invalid">
            Por favor, informe o Time!
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Label>Digite os gols do time 1:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="number"
              placeholder="Número de gols..."
              value={placar.resultado_time_id_1}
              id="resultado_time_id_1"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira o resultado!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* TIME 2 */}

        <Col>
          <Form.Label>Selecione o Time 2:</Form.Label>
          <CaixaSelecao
            urlBase3={urlBase7}
            campoChave="id"
            campoSelecao={"nome"}
            dados={listaTimes}
            funccaoSelecao={setTimeSelecionado}
          ></CaixaSelecao>
          <Form.Control.Feedback type="invalid">
            Por favor, informe o Time!
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Label>Digite os gols do time 2:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="number"
              placeholder="Número de gols..."
              value={placar.resultado_time_id_2}
              id="resultado_time_id_2"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira o resultado!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Digite a data da partida:</Form.Label>
          <Form.Group>
            <Form.Control
              as={IMaskInput}
              mask={"00/00/0000"}
              required
              type="text"
              placeholder="00/00/0000"
              value={placar.data}
              id="data"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira a data da partida!
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

export default FormPlacar;

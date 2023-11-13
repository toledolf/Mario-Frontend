import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { urlBase11 } from "../utilitarios/definicoes";
import { urlBase7 } from "../utilitarios/definicoes";
import CaixaSelecao from "./CaixaSelecao";

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
        <h1>Cadastro de Placares</h1>
      </Container>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Id:</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="O id será gerado automaticamente."
              value={placar.id}
              id="id"
            />
          </Form.Group>
        </Col>

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
            Por favor, informe um Treinador!
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Label>Digite o Resultado do time 1:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="number"
              placeholder="Número de gols"
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
            Por favor, informe um Treinador!
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Label>Digite o Resultado do time 2:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="number"
              placeholder="Número de gols"
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
          <Form.Label>Digite a data:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="date"
              placeholder="Data do jogo"
              value={placar.data}
              id="data"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira a data de Fundação!
            </Form.Control.Feedback>
          </Form.Group>
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

export default FormPlacar;

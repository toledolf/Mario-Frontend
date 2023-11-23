import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { urlBase2, urlBase7, urlBase8 } from "../utilitarios/definicoes";
import BarraBusca from "./BarraBusca.js";
import CaixaSelecao from "./CaixaSelecao";

function FormAgendamento(props) {
  const [validado, setValidado] = useState(false);
  const [jogador, setJogador] = useState(props.jogador);

  function manipularInput(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setJogador({ ...jogador, [id]: valor });
  }

  function manipularEnvio(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const usuario = {
        cpf: usuarioSelecionado.cpf,
        nome: usuarioSelecionado.nome,
      };

      const time = {
        id: timeSelecionado.id,
      };

      const dadosParaEnvio = {
        posicao: jogador.posicao,
        time: time.id,
        usuario: usuario.cpf,
      };

      if (!props.modoEdicao) {
        fetch(urlBase8, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Jogador cadastrado com sucesso!!!");
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
        dadosParaEnvio.id = jogador.id;
        fetch(urlBase8, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        }).then((resp) => {
          window.alert("Jogador Atualizado com Sucesso!!!");
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
        <h1>Associar jogador/usuário ao Time</h1>
      </Container>
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
              value={jogador.id}
              id="id"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Selecione um Time:</Form.Label>
          <CaixaSelecao
            urlBase3={urlBase7}
            campoChave="id"
            campoSelecao={"nome"}
            dados={ListaUsuarios}
            funccaoSelecao={setTimeSelecionado}
          ></CaixaSelecao>
          <Form.Control.Feedback type="invalid">
            Por favor, informe um Time!
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Label>Selecione uma posição:</Form.Label>
          <Form.Select
            aria-label="Selecione uma Posição..."
            value={jogador.posicao}
            id="posicao"
            onChange={manipularInput}
          >
            <option value="Erro! Seleção não efetivada!">Selecione uma Posição...</option>
            <option value="Goleiro">Goleiro</option>
            <option value="Zagueiro">Zagueiro</option>
            <option value="Lateral">Lateral</option>
            <option value="Meia">Meia</option>
            <option value="Volante">Volante</option>
            <option value="Atacante">Atacante</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Por favor, informe uma Posição!
          </Form.Control.Feedback>
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

export default FormAgendamento;

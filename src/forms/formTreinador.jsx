import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { urlBase10 } from "../utilitarios/definicoes";
import { IMaskInput } from "react-imask";

function FormTreinador(props) {
  const [validado, setValidado] = useState(false);
  const [treinador, setTreinador] = useState(props.treinador);

  function manipularInput(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setTreinador({ ...treinador, [id]: valor });
  }

  function manipularEnvio(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const dadosParaEnvio = {
        nome: treinador.nome,
        cidade: treinador.cidade,
        email: treinador.email,
        telefone: treinador.telefone,
        descricao: treinador.descricao,
      };
      if (!props.modoEdicao) {
        fetch(urlBase10, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Treinador cadastrado com sucesso!!!");
              window.location.reload();
              return resposta.json();
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert(error.message);
          });
      } else {
        dadosParaEnvio.id = treinador.id;
        fetch(urlBase10, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        }).then((resp) => {
          window.alert("Treinador Atualizado com Sucesso!!!");
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

  return (
    <Form
      noValidate
      validated={validado}
      onSubmit={manipularEnvio}
    >
      <Container className="mt-4 mb-4 d-flex justify-content-center">
        <h1>Cadastro de Treinadores</h1>
      </Container>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Id:</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="O id será gerado automaticamente."
              value={treinador.id}
              id="id"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Label>Digite o nome do Treinador:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Nome do Treinador"
              value={treinador.nome}
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
              placeholder="Exemplo: Belo Horizonte"
              value={treinador.cidade}
              id="cidade"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira uma Cidade!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Digite o Email:</Form.Label>
          <Form.Group>
            <Form.Control
              required
              type="email"
              placeholder="fulano@example.com"
              value={treinador.email}
              id="email"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira o email!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Label>Digite o Telefone:</Form.Label>
          <Form.Group>
            <Form.Control
              as={IMaskInput}
              mask={"(00) 00000-0000"}
              required
              type="text"
              placeholder="(00) 00000-0000"
              value={treinador.telefone}
              id="telefone"
              onChange={manipularInput}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, insira o telefone!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Row>
          <Col className="mt-3">
            <Form.Group
              className="mb-3"
              controlId="descricao"
            >
              <Form.Label style={{ textAlign: "center" }}>
                Descreva a carreira do Treinador:
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Descreva sua carreira. Seja objetivo!"
                style={{ width: "600px", height: "180px", margin: "auto" }}
                value={treinador.descricao}
                id="descricao"
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
        <Col className="mt-3">
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
    </Form>
  );
}

export default FormTreinador;

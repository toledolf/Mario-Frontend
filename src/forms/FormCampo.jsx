import { useState } from "react";
import { Form, Row, Col, Button, Container, FormSelect } from "react-bootstrap";
import { urlBase3 } from "../utilitarios/definicoes";

function FormCampo(props) {
  const [validado, setValidado] = useState(false);
  const [campo, setCampo] = useState(props.campo);

  function manipularInput(e) {
    const elementoForm = e.currentTarget;
    const id = elementoForm.id;
    const valor = elementoForm.value;
    setCampo({ ...campo, [id]: valor });
  }

  function manipularEnvio(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const dadosParaEnvio = {
        corReferencial: campo.corReferencial,
        descricao: campo.descricao,
      };
      if (!props.modoEdicao) {
        fetch(urlBase3, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        })
          .then((resposta) => {
            if (resposta.ok) {
              window.alert("Campo cadastrado com sucesso!!!");
              window.location.reload();
              return resposta.json();
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert(error.message);
          });
      } else {
        dadosParaEnvio.id = campo.id;
        fetch(urlBase3, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        }).then((resp) => {
          window.alert("Campo Atualizado com Sucesso!!!");
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
        <h1>Cadastro de Campos</h1>
      </Container>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Id:</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="O id será gerado automaticamente."
              value={campo.id}
              id="id"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Selecione uma Cor:</Form.Label>
          <Form.Select
            value={campo.corReferencial}
            id="corReferencial"
            required
            onChange={manipularInput}
          >
            <option value="Erro! Seleção não efetivada!">Selecione uma Cor...</option>
            <option value="Azul">1 - Azul</option>
            <option value="Verde">2 - Verde</option>
            <option value="Roxo">3 - Roxo</option>
            <option value="Amarelo">4 - Amarelo</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Por favor, informe uma Cor!
          </Form.Control.Feedback>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Selecione a situação do Campo:</Form.Label>
            <FormSelect
              value={campo.descricao}
              id="descricao"
              required
              onChange={manipularInput}
            >
              <option value="Erro! Seleção não efetivada!">
                Selecione uma Situação...
              </option>
              <option value="Em manutenção">Em manutenção - Indisponível</option>
              <option value="Regular">Regular - Disponível</option>
              <option value="Sem manutenção">Sem manutenção - Aguarde...</option>
              <option value="Excelente">Excelente - Disponível</option>
            </FormSelect>
            <Form.Control.Feedback type="invalid">
              Por favor, insira uma Situação!
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

export default FormCampo;

import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { IMaskInput } from "react-imask";
import { urlBase2 } from "../utilitarios/definicoes";

export default function FormUsuarios(props) {
  // const [atualizando, setAtualizando] = useState(false);
  const [validado, setValidate] = useState(false);
  const [usuario, setUsuario] = useState(props.usuario);

  function manipulaEvento(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setUsuario({ ...usuario, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        fetch(urlBase2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaUsuarios;
              novaLista.push(usuario);
              props.setUsuarios(novaLista);
              props.exibirTabela(true);
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      } else {
        fetch(urlBase2, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            window.alert(dados.mensagem);
          })

          .then(window.location.reload());
      }

      setValidate(false);
    } else {
      setValidate(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  return (
    <Container className="bg-light">
      <Form
        noValidate
        validated={validado}
        onSubmit={manipulaSubmissao}
      >
        <Row>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="nome"
            >
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome"
                value={usuario.nome}
                id="nome"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe o nome!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="cpf"
            >
              <Form.Label>CPF</Form.Label>
              <Form.Control
                required
                as={IMaskInput}
                mask="000.000.000-00"
                placeholder="Digite o CPF"
                value={usuario.cpf}
                id="cpf"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe o CPF!
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
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                required
                type="date"
                value={usuario.dataNasc}
                id="dataNasc"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe a data!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group
              className="mb-3"
              controlId="email"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={usuario.email}
                id="email"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe seu email!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="tel"
            >
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                required
                type="text"
                as={IMaskInput}
                mask="(00) 00000-0000"
                placeholder="Telefone"
                value={usuario.tel}
                id="tel"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, um telefone para contato!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Sexo</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={usuario.sexo}
                id="sexo"
                onChange={manipulaEvento}
              >
                <option null>Selecione uma opção</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Informe seu sexo!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="cidade"
            >
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Cidade"
                value={usuario.cidade}
                id="cidade"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe sua cidade!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={usuario.estado}
                id="uf"
                onChange={manipulaEvento}
              >
                <option null>Selecione um Estado Federativo</option>
                <option value="Acre - AC">Acre - AC</option>
                <option value="Alagoas - AL">Alagoas - AL</option>
                <option value="Amapá - AP">Amapá - AP</option>
                <option value="Amazonas - AM">Amazonas - AM</option>
                <option value="Bahia - BA">Bahia - BA</option>
                <option value="Ceará - CE">Ceará - CE</option>
                <option value="Distrito Federal - DF">Distrito Federal - DF</option>
                <option value="Espírito Santo - ES">Espírito Santo - ES</option>
                <option value="Goiás - GO">Feminino</option>
                <option value="Maranhão - MA">Maranhão - MA</option>
                <option value="Mato Grosso - MG">Mato Grosso - MG</option>
                <option value="Mato Grosso do Sul - MS">Mato Grosso do Sul - MS</option>
                <option value="Minas Gerais - MG">Minas Gerais - MG</option>
                <option value="Pará - PA">Pará - PA</option>
                <option value="Paraíba - PB">Paraíba - PB</option>
                <option value="Paraná - PR">Paraná - PR</option>
                <option value="Pernambuco - PB">Pernambuco - PB</option>
                <option value="Piauí - PI">Piauí - PI</option>
                <option value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</option>
                <option value="Rio Grande do Norte - RN">Rio Grande do Norte - RN</option>
                <option value="Rio Grande do Sul - RS">Rio Grande do Sul - RS</option>
                <option value="Rondônia - RO">Rondônia - RO</option>
                <option value="Roraima - RR">Roraima - RR</option>
                <option value="Santa Catarina - SC">Santa Catarina - SC</option>
                <option value="São Paulo - SP">São Paulo - SP</option>
                <option value="Sergipe - SE">Sergipe - SE</option>
                <option value="Tocantins - TO">Tocantins - TO</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Informe um estado!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>É treinador?</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={usuario.treinador}
                id="treinador"
                onChange={manipulaEvento}
              >
                <option null>Selecione uma opção</option>
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Informe se é treinador ou não!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>É Jogador?</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={usuario.jogador}
                id="jogador"
                onChange={manipulaEvento}
              >
                <option null>Selecione uma opção</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, informe se é jogador ou não!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row></Row>
        <br />
        <Row></Row>
        <br />
        <>
          <Button
            type="submit"
            variant="success"
          >
            Enviar
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              props.exibirTabela(true);
            }}
          >
            Voltar
          </Button>
        </>
      </Form>
    </Container>
  );
}

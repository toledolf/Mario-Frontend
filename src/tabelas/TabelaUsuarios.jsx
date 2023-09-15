// import { useState } from "react";
import { Button, Table, Container, Form, Row, Col } from "react-bootstrap";
import { urlBase2 } from "../utilitarios/definicoes";

export default function TabelaUsuarios(props) {
  // const [usuarios, setUsuarios] = useState(props.listaUsuarios)

  function filtrar(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBase2, { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaUsuarios) => {
        if (Array.isArray(listaUsuarios)) {
          const resultadoBusca = listaUsuarios.filter((usuario) =>
            usuario.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setUsuarios(resultadoBusca);
        }
      });
  }

  return (
    <Container className="m-4">
      <Button
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Cadastrar
      </Button>

      <Container className=" m-3">
        <Row>
          <Col md-11>
            <Form.Control
              type="text"
              id="termoBusca"
              placeholder="Filtre sua busca"
              onChange={filtrar}
            />
          </Col>
          <Col md-1>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </Button>
          </Col>
        </Row>
      </Container>

      <Table
        striped
        bordered
        hover
        size="sm"
      >
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data Nascimento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Sexo</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Treinador ?</th>
            <th>Jogador ?</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listaUsuarios?.map((usuario) => {
            return (
              <tr key={usuario.cpf}>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.dataNasc}</td>
                <td>{usuario.email}</td>
                <td>{usuario.tel}</td>
                <td>{usuario.sexo}</td>
                <td>{usuario.cidade}</td>
                <td>{usuario.uf}</td>
                <td>{usuario.treinador}</td>
                <td>{usuario.jogador}</td>
                <td>
                  <Button
                    onClick={() => {
                      if (window.confirm("Deseja excluir?")) {
                        props.deletar(usuario);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </Button>{" "}
                  <Button
                    onClick={() => {
                      if (window.confirm("Deseja atualizar?")) {
                        props.editar(usuario);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

import { Container, Table, Button, Row, Col, FormControl } from "react-bootstrap";
import { urlBase3 } from "../utilitarios/definicoes";

function TabelaCampo(props) {
  function filtrar(e) {
    const termoBusca = e.currentTarget.value.toLowerCase();
    fetch(urlBase3, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaCampos) => {
        if (Array.isArray(listaCampos)) {
          const resultadoBusca = listaCampos.filter((campo) =>
            campo.corReferencial.toLowerCase().includes(termoBusca)
          );
          props.setCampos(resultadoBusca);
        }
      });
  }

  return (
    <Container>
      <Container className="m-3">
        <Row>
          <Col>
            <FormControl
              type="text"
              id="termoBusca"
              onChange={filtrar}
              placeholder="Digite a cor do CAMPO..."
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Table
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Cor de Referência</th>
            <th>Situação</th>
            <th>Editar | Excluir Campo</th>
          </tr>
        </thead>
        <tbody>
          {props.listaCampos?.map((campo) => {
            return (
              <tr key={campo.id}>
                <td>{campo.id}</td>
                <td>{campo.corReferencial}</td>
                <td>{campo.descricao}</td>
                <td>
                  <Button
                    onClick={() => {
                      props.editarCampo(campo);
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
                  </Button>{" "}
                  <Button
                    onClick={() => {
                      if (window.confirm("Deseja realmente deletar esse campo?"))
                        props.deletarCampo(campo);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      f
                      ill="currentColor"
                      className="bi bi-trash2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z" />
                    </svg>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        onClick={() => {
          props.mostraTabela(false);
        }}
      >
        Cadastrar Campo
      </Button>
    </Container>
  );
}

export default TabelaCampo;

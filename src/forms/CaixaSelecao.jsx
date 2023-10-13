import { Container, Form, Col, Row, Spinner } from "react-bootstrap";
import React, { useState } from "react";
import { useEffect } from "react";

export default function CaixaSelecao({
  urlBase3,
  campoChave,
  campoSelecao,
  funccaoSelecao,
}) {
  const [valorSelecionado, setValorSelecionado] = useState({
    [campoChave]: 0,
    [campoSelecao]: "Não foi possível obter os dados.",
  });

  const [loadingData, setLoadingData] = useState(false);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    try {
      setLoadingData(true);
      fetch(urlBase3, { method: "GET" })
        .then((resposta) => {
          if (resposta.ok) {
            return resposta.json();
          } else {
            return [
              { [campoChave]: 0, [campoSelecao]: "Não foi possível obter os dados." },
            ];
          }
        })
        .then((listaDados) => {
          setLoadingData(false);
          setDados(listaDados);
          if (listaDados.length > 0) {
            setValorSelecionado(listaDados[0]);
            funccaoSelecao(listaDados[0]);
          }
        });
    } catch (erro) {
      setLoadingData(false);
      setDados([{ [campoChave]: 0, [campoSelecao]: "Não foi possível obter os dados." }]);
    }
  }, []);

  return (
    <Container border>
      <Row>
        <Col md={11}>
          <Form.Select
            value={valorSelecionado[campoChave]}
            onChange={(evento) => {
              console.log("onChange acionado");
              const novoValorSelecionado = evento.currentTarget.value;
              const novoItemSelecionado = dados.find(
                (item) => item[campoChave].toString() === novoValorSelecionado
              );
              setValorSelecionado(novoItemSelecionado);
              funccaoSelecao(novoItemSelecionado);
            }}
            aria-label="Default select example"
          >
            {dados.map((item) => {
              return (
                <option
                  key={item[campoChave]}
                  value={item[campoChave]}
                >
                  {item[campoSelecao]}
                </option>
              );
            })}
          </Form.Select>

          <Row>
            <Spinner className={loadingData ? "visible" : "invisible"}></Spinner>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

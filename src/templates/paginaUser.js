import { Container } from "react-bootstrap";
import { Cabecalho } from "./cabecalho.js";
import MenuUser from "./menuUser.js";

export default function paginaUser(props) {
  return (
    <div>
      <Cabecalho texto="Sistema de Gerenciamento de Horários" />
      <MenuUser />
      <Container>{props.children}</Container>
    </div>
  );
}

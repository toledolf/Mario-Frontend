import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function MenuUser(props) {
  return (
    <Navbar
      bg="light"
      expand="lg"
    >
      <Container>
        <LinkContainer to="/TelaMenuUser">
          <Navbar.Brand>Inicio</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="MenuUser"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Divider />
              <LinkContainer to="/FormAgendamento">
                <NavDropdown.Item>Agendamentos</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormUsuario">
                <NavDropdown.Item>Usuários</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/formJogador">
                <NavDropdown.Item>Jogadores/Times</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormTime">
                <NavDropdown.Item>Times</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormDoacao">
                <NavDropdown.Item>Doações</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormDenuncia">
                <NavDropdown.Item>Denúncias</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormTorneio">
                <NavDropdown.Item>Torneios</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormTreinador">
                <NavDropdown.Item>Treinadores</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/">Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
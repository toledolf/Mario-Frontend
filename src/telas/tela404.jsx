import { Alert } from "react-bootstrap";
import Pagina from "../templates/pagina";

export default function Tela404(props) {
  return (
    <Pagina>
      <Alert
        className="text-center"
        variant="danger"
      >
        Recurso não encontrado
      </Alert>
    </Pagina>
  );
}

import { Alert } from "react-bootstrap";
export function Cabecalho(props) {
  return (
    <div>
      <Alert
        className="text-center mb-0"
        variant="dark"
      >
        {props.texto}
      </Alert>
    </div>
  );
}

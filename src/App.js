import TelaAgendamento from "./telas/TelaAgendamento";
import TelasCadastro from "./telas/TelasCadastro";
import TelaMenu from "./telas/TelaMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tela404 from "./telas/tela404";
import TelaLogin from "./telas/telaLogin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<TelaLogin />}
          />
          <Route
            path="/telaMenu"
            element={<TelaMenu />}
          />
          <Route
            path="/FormAgendamento"
            element={<TelaAgendamento />}
          />
          <Route
            path="/FormUsuario"
            element={<TelasCadastro />}
          />
          <Route
            path="*"
            element={<Tela404 />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;

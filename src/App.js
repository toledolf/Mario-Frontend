import TelaAgendamento from "./telas/TelaAgendamento";
import TelasCadastro from "./telas/TelasCadastro";
import TelaMenu from "./telas/TelaMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tela404 from "./telas/tela404";
import TelaLogin from "./telas/telaLogin";
import TelaDenuncia from "./telas/TelaDenuncia";
import TelaDoacao from "./telas/TelaDoacao";
import TelaCampo from "./telas/TelaCampo";

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
            path="/FormDenuncia"
            element={<TelaDenuncia />}
          />
          <Route
            path="/FormDoacao"
            element={<TelaDoacao />}
          />
          <Route
            path="/FormCampo"
            element={<TelaCampo />}
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

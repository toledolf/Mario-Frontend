import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaAgendamento from "./telas/TelaAgendamento";
import TelasCadastro from "./telas/TelasCadastro";
import TelaMenu from "./telas/TelaMenu";
import Tela404 from "./telas/tela404";
import TelaLogin from "./telas/telaLogin";
import TelaDenuncia from "./telas/TelaDenuncia";
import TelaDoacao from "./telas/TelaDoacao";
import TelaCampo from "./telas/TelaCampo";
import TelaTorneio from "./telas/TelaTorneio";
import TelaJogador from "./telas/TelaJogador";
import TelaTime from "./telas/TelaTime";
import TelaTreinador from "./telas/telaTreinador";
import TelaPlacar from "./telas/telaPlacar";
import TelaMenuUser from "./telas/TelaMenuUser";
import TelaRequisicao from "./telas/TelaRequisicao";
import FormPrimeiroCadastro from "./primeiroCadastro/formCadastro";

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
            path="/formCadastro"
            element={<FormPrimeiroCadastro />}
          />
          <Route
            path="/telaMenu"
            element={<TelaMenu />}
          />
          <Route
            path="/TelaMenuUser"
            element={<TelaMenuUser />}
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
            path="/FormTorneio"
            element={<TelaTorneio />}
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
            path="/formJogador"
            element={<TelaJogador />}
          />
          <Route
            path="/formTreinador"
            element={<TelaTreinador />}
          />
          <Route
            path="/FormTime"
            element={<TelaTime />}
          />
          <Route
            path="/FormPlacar"
            element={<TelaPlacar />}
          />
          <Route
            path="/FormRequisicao"
            element={<TelaRequisicao />}
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

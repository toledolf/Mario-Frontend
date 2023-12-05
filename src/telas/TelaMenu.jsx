import Pagina from "../templates/pagina";
import Imagem from "../img/prefeitura.jpg";
import Imagem2 from "../img/prefeitura2.png";
import "./telaMenu.css";
import { useState, useEffect } from "react";

export default function TelaMenu(props) {
  const [isPrimeiraImagem, setIsPrimeiraImagem] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPrimeiraImagem((prevIsPrimeiraImagem) => !prevIsPrimeiraImagem);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pai">
      <Pagina className="tela">
        <h2>
          Bem-Vindo ao Sistema de Gerenciamento de Horários da Prefeitura de Anhumas!
        </h2>
        <img
          src={isPrimeiraImagem ? Imagem : Imagem2}
          alt="prefeitura logo"
          className="img-logo"
        />
      </Pagina>
    </div>
  );
}

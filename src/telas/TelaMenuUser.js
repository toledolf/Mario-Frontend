import PaginaUser from "../templates/paginaUser";
import Imagem from "../img/prefeitura.jpg";
import Imagem2 from "../img/prefeitura2.png";
import "./telaMenu.css";
import { useState, useEffect } from "react";

export default function TelaMenu(props) {
  const [isPrimeiraImagem, setIsPrimeiraImagem] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPrimeiraImagem((prevIsPrimeiraImagem) => !prevIsPrimeiraImagem);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pai">
      <PaginaUser className="tela">
        <h2>
          Bem-Vindo ao Sistema de Gerenciamento de Horarios da Prefeitura de Anhumas!
        </h2>
        <img
          src={isPrimeiraImagem ? Imagem : Imagem2}
          alt="prefeitura logo"
          className="img-logo"
        />
      </PaginaUser>
    </div>
  );
}
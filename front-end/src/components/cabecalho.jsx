import { useAuth } from "../AuthContext";
import { useTema } from "../ThemeContext";

function cabecalho () {

  const { usuario } = useAuth();
  const { tema, alternarTema } = useTema();

  return (
    <header className="text-white">

      <h1>Projeto HeróisRPG</h1>
      <div>
        <span>
          Jogador: {usuario.nome}
        </span>
        <button
          onClick={alternarTema}
        >
        </button>
      </div>
    </header>
  );
}

export default cabecalho;
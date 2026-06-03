import { useAuth } from "../AuthContext";

function rodape() {

  const { usuario } = useAuth();

  return (
    <footer className="text-white">
      Usuário logado: {usuario.nome}
    </footer>
  );
}

export default rodape;
import { useState, useEffect } from "react"; // ATIVIDADE 30.03 (Importando useEffect)
import Card from "./components/Card"; // Atividade Incial 11.02 (Criando o primeiro componente)
import Formulario from "./components/Formulario"; // Atividade 24.03 (Importando o componente Formulário)
import fundo from "./public/fundo.jpg"; // Estilização Própria (Coloquei um fundo mais coerente com o projeto)

// Import´s das ft´s de cada herois
import arqueira from "./assets/avatar/arqueira.png";
import guerreiro from "./assets/avatar/guerreiro.png";
import mage from "./assets/avatar/mage.png";

function App() {
  //Atividade 06.03 (Estrurando os dados dos herois e Props):
  const listaHerois = [
    { id: 1, nome: "Arthemis", classe: "Arqueira", imagem: arqueira, status: "online" },
    { id: 2, nome: "Grog", classe: "Guerreiro", imagem: guerreiro, status: "ausente" },
    { id: 3, nome: "Elora", classe: "Maga", imagem: mage, status: "offline" },
    { id: 4, nome: "Arthemis", classe: "Arqueira", imagem: arqueira, status: "online" },
    { id: 5, nome: "Grog", classe: "Guerreiro", imagem: guerreiro, status: "ausente" },
    { id: 6, nome: "Elora", classe: "Maga", imagem: mage, status: "offline" },
  ];

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    fontFamily: "sans-serif",
  };

  const novaLista = listaHerois.map((heroi) => ({
    ...heroi,
    aparecer: true,
    xp: 0,
    nivel: 0,
  }));

  const [lista, setLista] = useState(() => {
    const dadosSalvo = localStorage.getItem("herois");

    if (dadosSalvo) {
      return JSON.parse(dadosSalvo);
    }

    return novaLista;
  });

  useEffect(() => {
    localStorage.setItem("herois", JSON.stringify(lista));
  }, [lista]);

  // Atividade 10.03 (Imutabilidade e filtros )
  const filterMaga = () => {
    const maga = novaLista.filter((heroi) => {
      return heroi.classe === "Maga";
    });

    setLista(maga);
  };

  const filterGuerreiro = () => {
    const Guerreiro = novaLista.filter((heroi) => {
      return heroi.classe === "Guerreiro";
    });

    setLista(Guerreiro);
  };

  const filterArqueira = () => {
    const Arqueira = novaLista.filter((heroi) => {
      return heroi.classe === "Arqueira";
    });

    setLista(Arqueira);
  };

  const exibir = (id) => {
    const limpo = lista.map((heroi) => {
      if (heroi.id === id) {
        return { ...heroi, aparecer: false };
      }

      return heroi;
    });

    setLista(limpo);
  };

  // Atividade de hooks (16.03) - Botão "Excluir" que remove do array (filter)
  const excluirHeroi = (id) => {
    const listaNova = lista.filter((heroi) => heroi.id !== id);
    setLista(listaNova);
  };

  // Atividade 16.03 (Level Up)
  const xps = (id) => {
    const contar = lista.map((heroi) => {
      if (heroi.id === id) {
        const xpNovo = heroi.xp + 10;

        if (xpNovo >= 100) {
          const nivel = heroi.nivel + 1;

          return {
            ...heroi,
            xp: 0,
            nivel: nivel,
          };
        } else {
          return {
            ...heroi,
            xp: xpNovo,
          };
        }
      }

      return heroi;
    });

    setLista(contar);
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.55), rgba(0, 0, 0, 0.08)),
          url(${fundo})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="items-center w-full h-auto py-6 gap-4 mb-6">
        <h1 className="font-bold text-white text-center text-2xl">
          Projeto Herois (RPG)
        </h1>
      </div>

      {/* FORMULÁRIO */}
      <div className="mb-6">
        <Formulario />
      </div>

      {/* CARDS */}
      <div className="flex flex-col justify-center text-center">
        <div>
          {lista.some((h) => h.classe === "Maga" && h.aparecer) && (
            <h2 className="flex flex-col text-white">Maga</h2>
          )}

          <div style={containerStyle}>
            {lista
              .filter((heroi) => {
                return heroi.classe === "Maga";
              })
              .filter((heroi) => {
                return heroi.aparecer === true;
              })
              .map((heroi) => {
                return (
                  <Card
                    key={heroi.id}
                    heroi={heroi}
                    exibir={() => exibir(heroi.id)}
                    excluir={() => excluirHeroi(heroi.id)}
                    xps={() => xps(heroi.id)}
                  />
                );
              })}
          </div>
        </div>

        <div>
          {lista.some((h) => h.classe === "Guerreiro" && h.aparecer) && (
            <h2 className="flex flex-col text-white">Guerreiro</h2>
          )}

          <div style={containerStyle}>
            {lista
              .filter((heroi) => {
                return heroi.classe === "Guerreiro";
              })
              .filter((heroi) => {
                return heroi.aparecer === true;
              })
              .map((heroi) => {
                return (
                  <Card
                    key={heroi.id}
                    heroi={heroi}
                    exibir={() => exibir(heroi.id)}
                    excluir={() => excluirHeroi(heroi.id)}
                    xps={() => xps(heroi.id)}
                  />
                );
              })}
          </div>
        </div>

        <div>
          {lista.some((h) => h.classe === "Arqueira" && h.aparecer) && (
            <h2 className="flex flex-col text-white">Arqueira</h2>
          )}

          <div style={containerStyle}>
            {lista
              .filter((heroi) => {
                return heroi.classe === "Arqueira";
              })
              .filter((heroi) => {
                return heroi.aparecer === true;
              })
              .map((heroi) => {
                return (
                  <Card
                    key={heroi.id}
                    heroi={heroi}
                    exibir={() => exibir(heroi.id)}
                    excluir={() => excluirHeroi(heroi.id)}
                    xps={() => xps(heroi.id)}
                  />
                );
              })}
          </div>
        </div>
      </div>

      {/* Botão de filtragem de heróis */}
      <div className="bg-gray-500 shadow-lg flex flex-col justify-center items-center max-w-xl mx-auto py-6 gap-4 rounded-xl mb-6">
        <h1 className="font-bold text-white text-center text-lg">
          Seleção de Heróis (Filtre seu time)
        </h1>

        <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-xl"
            onClick={filterMaga}
          >
            Recrutar Maga
          </button>

          <button
            className="px-6 py-3 bg-red-700 text-white font-semibold rounded-xl"
            onClick={filterGuerreiro}
          >
            Recrutar Guerreiro
          </button>

          <button
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-xl"
            onClick={filterArqueira}
          >
            Recrutar Arqueira
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
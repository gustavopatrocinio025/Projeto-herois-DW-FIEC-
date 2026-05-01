import { useState, useEffect} from "react"; // ATIVIDADE 06.04: Importando hooks
import Card from "./components/Card";
import Formulario from "./components/Formulario";

// Import´s das ft´s de cada herois
import arqueira from "./assets/avatar/arqueira.png";
import guerreiro from "./assets/avatar/guerreiro.png";
import mage from "./assets/avatar/mage.png";

function App() {
  //Atividade 06.04:
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

useEffect( () =>{
  localStorage.setItem("herois", JSON.stringify(lista));
  }, [lista]);

  
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

  const xps = (id) => {
    const contar = lista.map((heroi) => {
      if (heroi.id === id) {
        const xpNovo = heroi.xp + 50;

        if (xpNovo >= 100) {
          const nivel = (heroi.nivel += 1);

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
  <>
     <div className="bg-blue-900 shadow-lg flex justify-center items-center w-full h-32">

      <h1 className="font-bold text-white text-center"> Seleção de Heróis (Recrute seu time)
      </h1>
        <br />
      <button
        className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-xl "  onClick={filterMaga} > Recrutar Maga
      </button>

      <button
        className="px-6 py-3 bg-red-800  text-white font-semibold rounded-xl"  onClick={filterGuerreiro}>  Recrutar Guerreiro
      </button>

      <button
        className="px-6 py-3 bg-green-700 text-white font-semibold rounded-xl"  onClick={filterArqueira}>  Recrutar Arqueira
      </button>

   
      </div>

      <div></div>

      <div className="flex flex-col justify-center text-center">


        <div>
          {lista.some(h => h.classe === "Maga" && h.aparecer) && (
              <h2 className="flex flex-col my-8">Maga</h2>
          )}

          <div style={containerStyle}>
            {lista
              .filter((heroi) => {
                return heroi.classe === "Maga"
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
                    xps={() => xps(heroi.id)}
                  />
                );
              })}
          </div>
        </div>

        <div className="">
          {lista.some(h => h.classe === "Guerreiro" && h.aparecer) && (
              <h2 className="flex flex-col my-8">Guerreiro</h2>
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
                    xps={() => xps(heroi.id)}
                  />
                );
              })}
          </div>
        </div>

        <div>
          {lista.some(h => h.classe === "Arqueira" && h.aparecer) && (
              <h2 className="flex flex-col my-8">Arqueira</h2>
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
                    xps={() => xps(heroi.id)}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <Formulario />
    </>
  );
}

export default App;
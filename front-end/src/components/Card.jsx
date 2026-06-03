import StatusBadge from "./StatusBadge"; // Import do status de cada heroi 


function Card({ heroi, exibir, xps}) {
  const chamado = () => {
    alert(`${heroi.nome} foi recrutado com sucesso!`);
  };

const subirDeNivel = heroi.xp === 0 && heroi.nivel > 0;

  const cardStyle = {
    borderRadius: "12px",
    padding: "16px",
    margin: "10px",
    boxShadow: "8 4px 8px rgba(0,8, 0.1)",
    textAlign: "center",
    width: "200px",
  };
  return (
    <div style={cardStyle} className={` ${subirDeNivel ? 'bg-yellow-600 border-4 border-red-700' : 'bg-white/70 '}`}>
      <StatusBadge tipo={heroi.status} />
      <img
        src={heroi.imagem}
        alt={heroi.nome}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h2>{heroi.nome}</h2>
      {subirDeNivel && <p className="text-black">Subiu de Nivel </p>}

      <p>Nivel: <span className="text-green">{heroi.nivel}</span></p>
<p>XP: <span>{heroi.xp}</span></p>
<p>Classe: {heroi.classe}</p>

<button 
  className="w-full mt-3 py-2 text-white rounded-md bg-blue-600" onClick={chamado}> Recrutar
</button>

<button 
  className="w-full mt-3 py-2 text-white rounded-md bg-red-600" onClick={exibir}> Excluir
</button>

<button 
  className="w-full mt-3 py-2 text-white rounded-md bg-lime-600" onClick={xps}> XP
</button>
</div>
    );
}

export default Card;



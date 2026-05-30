// Atividade 24.03 (Adicionando os import´s necessários e criando o componente Formulário )
import { useState } from "react";
import { z } from 'zod';
import axios from "axios"; // Atividade 30.05 (Comunicação com a API)
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Atividade 30.05 (Mutações e escrita de dados)

const schema = z.object({
  nome: z.string().min(3, "O nome está curto"),
  classe: z.string().min(4, "A classe está curta"),
})

function Formulario(){
    const [dados, setDados] = useState ({
        nome: '',
        classe: ''
    });
    const [erros, setErros] = useState({});

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
      mutationFn: (novoHeroi) => {
        return axios.post("http://localhost:3000/herois", novoHeroi);
      },

      onSuccess: () => {

        // Atividade 30.05 (Atualiza os dados da API automaticamente)
        queryClient.invalidateQueries({
          queryKey: ["herois"],
        });

        alert("Herói criado com sucesso!");
      },

      onError: () => {
        alert("Erro ao salvar herói!");
      }
    });

    function handleChange(e) {
    setDados({
      ...dados,[e.target.name]: e.target.value
    })
  }

    
    function handleSubmit(e) {
    e.preventDefault();

    const result = schema.safeParse(dados);

    if (!result.success) {
      const errosFormatados = result.error.format();

      if (errosFormatados.nome?._errors[0]) {
        alert(errosFormatados.nome._errors[0]);
      }

      if (errosFormatados.classe?._errors[0]) {
        alert(errosFormatados.classe._errors[0]);
      }

      setErros(errosFormatados);
    } else {
      setErros({});

      mutate({
        nome: dados.nome,
        classe: dados.classe,
        status: "online",
        xp: 0,
        nivel: 0
      });

      setDados({
        nome:'',
        classe:''
      });
    }
  }

  return(<>
  {/* Voltar aqui */}
  <h1 className="text-xl font-bold text-center  text-white mb-4 text-green">
  Crie seu novo herói
  </h1>

    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-4xl  space-y-5"
    >
      <div className="flex flex-col">
        <label htmlFor="nome" className="text-center text-red-500">
          Nome:
        </label>

        <input
          type="name"
          name="nome"
          value={dados.nome}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="classe" className="text-center text-red-500">
          Classe:
        </label>

        <input
          type="name"
          name="classe"
          value={dados.classe}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border"
        />
      </div>

     <button
      type="submit"
      disabled={isPending}
      className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg mx-auto block">
      {isPending ? "Salvando..." : "Enviar"}
    </button>

      {/* Atividade 24.03 - Desafio de mostrar em tempo real as iformações digitadas no forms */}
      <div className="text-center">
        <p>Nome: {dados.nome }</p>
        <p>Classe: {dados.classe}</p>
      </div>

    </form>
    <div></div>
  </>)
}

export default Formulario;
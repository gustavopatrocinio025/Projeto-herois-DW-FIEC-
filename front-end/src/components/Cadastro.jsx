import { useState } from "react";

export function useCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("O usuário foi cadastrado com exito");

        setNome("");
        setEmail("");
        setSenha("");
      } else {
        setMensagem("Erro: " + data.erro);
      }
    } catch (error) {
      setMensagem("Houve um erro ao conectar com o servidor!");
    }
  };

  return {
    nome,
    email,
    senha,
    mensagem,
    setNome,
    setEmail,
    setSenha,
    handleCadastro,
  };
}
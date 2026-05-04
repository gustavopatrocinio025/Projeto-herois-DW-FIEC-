import { useState } from "react";


function Cadastro() {
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
        setMensagem("Usuário cadastrado com sucesso!");
        // limpar os campos
        setNome("");
        setEmail("");
        setSenha("");
      } else {
        setMensagem("Erro: " + data.erro);
      }
    } catch (error) {
      setMensagem("Erro: ao conectar com o servidor!");
    }
  };

  return (
  <div className="flex min-h-screen items-start justify-end bg-gray-100 pr-10">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">

      <h2 className="text-2xl font-bold text-center text-gray-800">
        Cadastro
      </h2>

      <form 
        className="space-y-5 bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
        onSubmit={handleCadastro}
      >

        <h2 className="text-xl font-bold text-gray-800 text-center">
          Criar Conta
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Nome
          </label>

          <input
            type="text"
            required
            placeholder="Digite seu nome"
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Email
          </label>

          <input
            type="email"
            required
            placeholder="Digite seu email"
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Senha
          </label>

          <input
            type="password"
            required
            placeholder="Digite sua senha"
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Cadastrar
        </button>

        {mensagem && (
          <p className="text-center text-sm text-blue-600">
            {mensagem}
          </p>
        )}

      </form>

      {mensagem && (
        <p className="text-center text-sm text-blue-600">
          {mensagem}
        </p>
      )}

    </div>
  </div>
  );
}

export default Cadastro;
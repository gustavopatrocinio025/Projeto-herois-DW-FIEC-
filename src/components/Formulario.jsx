import { useFormularioHeroi } from "../hooks/useFormularioHeroi";

function Formulario() {
  const {
    erros,
    handleChange,
    handleSubmit,
  } = useFormularioHeroi();

  function enviarFormulario(e) {
    const valido = handleSubmit(e);

    if (valido) {
      alert("Formulário enviado com sucesso!");
    }
  }

  return (
    <>
      <form
        onSubmit={enviarFormulario}
        className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-5"
      >
        <div className="flex flex-col">
          <label
            htmlFor="nome"
            className="text-sm font-semibold text-gray-700 mb-1"
          >
            Nome
          </label>

          <input
            type="text"
            name="nome"
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            placeholder="Digite o nome"
          />

          {erros.nome && (
            <p className="text-red-500 text-sm mt-1">
              {erros.nome._errors}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="classe"
            className="text-sm font-semibold text-gray-700 mb-1"
          >
            Classe
          </label>

          <input
            type="text"
            name="classe"
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            placeholder="Digite a classe"
          />

          {erros.classe && (
            <p className="text-red-500 text-sm mt-1">
              {erros.classe._errors}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-sm"
        >
          Enviar
        </button>
      </form>
    </>
  );
}

export default Formulario;
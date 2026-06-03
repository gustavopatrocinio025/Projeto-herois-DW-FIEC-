import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {

  const [tema, setTema] = useState(() => {
    return localStorage.getItem("@Herois:tema") || "claro";
  });

  const alternarTema = () => {
    setTema((atual) => {
      const novoTema = atual === "claro" ? "escuro" : "claro";

      localStorage.setItem("@Herois:tema", novoTema);

      return novoTema;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        tema,
        alternarTema
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  return useContext(ThemeContext);
}
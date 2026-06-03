import { createContext, useContext } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const usuario = {
    nome: "Gustavo Henrique "
  };

  return (
    <AuthContext.Provider value={{ usuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
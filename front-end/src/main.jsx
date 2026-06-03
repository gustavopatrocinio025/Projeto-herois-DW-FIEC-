import { StrictMode } from 'react' // Mostra possíveis erros e exbibe no navegador
import { createRoot } from 'react-dom/client' // Permite o main dominar aquela div vazia do index.html
import App from './App.jsx' /// Traz as informações que estão dentro do arquivo app.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";  // Atividade 30.05 (Gerencia cache, consultas e mutações da APi)
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>
</QueryClientProvider>
  </StrictMode>
);
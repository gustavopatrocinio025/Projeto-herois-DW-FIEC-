import { StrictMode } from 'react' // Mostra possíveis erros e exbibe no navegador
import { createRoot } from 'react-dom/client' // Permite o main dominar aquela div vazia do index.html
import App from './App.jsx' /// Traz as informações que estão dentro do arquivo app.jsx


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

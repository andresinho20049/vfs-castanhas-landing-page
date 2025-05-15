
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Definir cores da marca no CSS
document.documentElement.style.setProperty('--vfs-blue', '#3b82f6');  // Azul principal
document.documentElement.style.setProperty('--vfs-brown', '#8b5cf6'); // Tom roxo/marrom para contraste

createRoot(document.getElementById("root")!).render(<App />);

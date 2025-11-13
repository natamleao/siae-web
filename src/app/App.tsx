import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { RecuperarSenha } from './RecuperarSenha';

export default function App() {
    return (
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} /> 

                <Route path="/recuperar-senha" element={<RecuperarSenha />} />

                {/* adicionar mais rotas aqui, como o cadastro:
                <Route path="/cadastro" element={<Register />} />
                */}
            </Routes>
        </BrowserRouter>
    );
}

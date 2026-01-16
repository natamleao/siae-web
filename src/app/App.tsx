import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { RecuperarSenha } from "./RecuperarSenha";

export default function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<SignUp/>}/>
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />

          </Routes>
        </BrowserRouter>        
    );
}

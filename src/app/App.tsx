import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { RecuperarSenha } from "./RecuperarSenha";
import { Dashboard } from "./Dashboard";
import { PainelAdministrativo } from "./PainelAdministrativo";
import { DetailSolicitacao } from "./DetailSolicitacao";
import { Formulario } from "./formulario";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PublicRoute } from "../components/PublicRoute";
import { AuthProvider } from "../context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/cadastro" element={<PublicRoute><SignUp /></PublicRoute>} />
                    <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                    <Route path="/formulario" element={<PublicRoute><Formulario /></PublicRoute>} />

                    <Route
                        path="/detalhe-solicitacao/:auxilioId"
                        element={<DetailSolicitacao />}
                    />

                    <Route element={<ProtectedRoute permissoesPermitidas={["ALUNO"]} />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    <Route element={
                        <ProtectedRoute permissoesPermitidas={["TECNICO", "ASSISTENTE"]} />
                    }>
                        <Route
                            path="/paineladministrativo"
                            element={<PainelAdministrativo />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

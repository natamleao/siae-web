import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { RecuperarSenha } from "./RecuperarSenha";
import { Dashboard } from "./Dashboard";
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
                    <Route path="/recuperar-senha" element={<PublicRoute><RecuperarSenha /></PublicRoute>} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

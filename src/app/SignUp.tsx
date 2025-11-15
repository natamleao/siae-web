import { useState, type FormEvent } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InputField } from "../components/Input";

export function SignUp() {
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // TODO: implementar chamada pra API de cadastro
  }

  const isDisabled = false;

  return (
    <main className="flex flex-col min-h-screen max-lg:h-screen">
      <Header />

      <section className="bg-white grow flex w-full justify-center items-center py-12">
        <div className="text-black w-full flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center"
          >
            <h2 className="font-bold text-2xl mb-6">Crie sua conta</h2>

            <div className="w-2/4 max-md:w-3/4 mb-6">
              <div className="bg-gray-200 rounded p-1">
                <div className="bg-blue-600 text-white text-sm font-medium text-center py-2 rounded">
                  Estudante
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full items-center space-y-4">
              <div className="w-2/4 max-md:w-3/4">
                <InputField
                  id="matricula"
                  label="Matrícula"
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </div>

              <div className="w-2/4 max-md:w-3/4">
                <InputField
                  id="email"
                  label="Email institucional"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="w-2/4 max-md:w-3/4">
                <InputField
                  id="password"
                  label="Senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Informe uma senha com pelo menos 8 dígitos, uma letra maiúscula e um
                  número.
                </p>
              </div>

              <div className="w-2/4 max-md:w-3/4">
                <InputField
                  id="confirmPassword"
                  label="Confirme sua senha"
                  type="password"
                  value={confirmacaoSenha}
                  onChange={(e) => setConfirmacaoSenha(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-2/4 max-md:w-3/4 flex justify-center mt-8">
              <button
                type="submit"
                disabled={isDisabled}
                className="bg-gray-400 w-full rounded-md p-2 font-semibold text-black disabled:cursor-not-allowed"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

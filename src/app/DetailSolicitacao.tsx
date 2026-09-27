import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SolicitacaoCard, StatusBadge } from "../components/SolicitacaoCard";
import {
  ordemStatus,
  type Solicitacao,
  type StatusSolicitacao,
} from "../types/solicitacao";

const nomesAuxilios: Record<string, string> = {
  "auxilio-creche": "Auxílio Creche",
  "isencao-ru": "Isenção Parcial do RU",
  "auxilio-ingressante": "Auxílio Ingressante",
  "auxilio-emergencial": "Auxílio Emergencial",
};

const idsAuxilios = Object.keys(nomesAuxilios);
const nomesEstudantes = [
  "Ana Oliveira",
  "Bruno Santos",
  "Camila Costa",
  "Diego Lima",
  "Eduarda Souza",
];

const solicitacoesMock: Solicitacao[] = idsAuxilios.flatMap(
  (auxilioId, indiceAuxilio) =>
    ordemStatus.map((status, indiceStatus) => {
      const numero = indiceAuxilio * 5 + indiceStatus + 1;

      return {
        id: `solicitacao-${numero}`,
        auxilioId,
        nome: nomesEstudantes[indiceStatus],
        matricula: `2025${indiceAuxilio}${String(indiceStatus + 1).padStart(3, "0")}`,
        cpf: `12345678${String(numero).padStart(3, "0")}`,
        submetidaEm: `2025-10-${String(20 + indiceStatus).padStart(2, "0")}`,
        status,
      };
    }),
);

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

export function DetailSolicitacao() {
  const { auxilioId } = useParams();
  const [busca, setBusca] = useState("");
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  const nomeAuxilio = auxilioId ? nomesAuxilios[auxilioId] : undefined;

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    setErro(false);

    const timer = window.setTimeout(() => {
      try {
        const dados = solicitacoesMock.filter(
          (item) => item.auxilioId === auxilioId,
        );

        if (!cancelado) setSolicitacoes(dados);
      } catch {
        if (!cancelado) setErro(true);
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }, 350);

    return () => {
      cancelado = true;
      window.clearTimeout(timer);
    };
  }, [auxilioId, tentativa]);

  const consulta = normalizar(busca.trim());
  const consultaCpf = busca.replace(/\D/g, "");

  const filtradas = solicitacoes.filter((item) => {
    const correspondeTexto =
      normalizar(item.nome).includes(consulta) ||
      normalizar(item.matricula).includes(consulta);

    const correspondeCpf =
      consultaCpf.length > 0 &&
      item.cpf.replace(/\D/g, "").includes(consultaCpf);

    return correspondeTexto || correspondeCpf;
  });

  const ordenadas = [...filtradas].sort((a, b) => {
    const ordem =
      ordemStatus.indexOf(a.status) - ordemStatus.indexOf(b.status);

    return ordem || Date.parse(a.submetidaEm) - Date.parse(b.submetidaEm);
  });

  const ultimaAtualizacao = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <section className="w-full flex-1 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav aria-label="Navegação estrutural" className="mb-6 text-sm">
            <Link
              to="/painel-administrativo"
              className="text-blue-700 hover:underline"
            >
              Painel Geral
            </Link>
            <span className="mx-2 text-slate-400" aria-hidden="true">&gt;</span>
            <span aria-current="page">{nomeAuxilio ?? "Auxílio não encontrado"}</span>
          </nav>

          <p className="mb-5 text-right text-xs text-slate-500">
            Atualizado em: {ultimaAtualizacao}
          </p>

          <h1 className="text-2xl font-bold">
            Solicitações: {nomeAuxilio ?? "Auxílio não encontrado"}
          </h1>

          <label htmlFor="busca-solicitacoes" className="sr-only">
            Buscar por nome, matrícula ou CPF
          </label>
          <input
            id="busca-solicitacoes"
            type="search"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Buscar por nome, matrícula ou CPF"
            className="mt-5 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 sm:max-w-lg"
          />

          {!carregando && !erro && (
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Totais por status">
              {ordemStatus.map((status: StatusSolicitacao) => {
                const total = solicitacoes.filter(
                  (item) => item.status === status,
                ).length;

                return (
                  <div
                    key={status}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2"
                  >
                    <StatusBadge status={status} />
                    <span className="text-sm font-bold text-slate-800">{total}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 space-y-3">
            {carregando && (
              <div role="status" className="flex items-center gap-3 py-8 text-slate-600">
                <span className="size-5 animate-spin rounded-full border-2 border-blue-700 border-t-transparent" />
                <span>Carregando solicitações do auxílio selecionado…</span>
              </div>
            )}

            {!carregando && erro && (
              <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
                <p>Falha ao carregar as solicitações. Tente novamente mais tarde.</p>
                <button
                  type="button"
                  onClick={() => setTentativa((valor) => valor + 1)}
                  className="mt-3 font-semibold underline"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!carregando && !erro && ordenadas.length === 0 && (
              <p className="rounded-md border border-slate-200 bg-white p-5 text-slate-600">
                Nenhuma solicitação encontrada.
              </p>
            )}

            {!carregando &&
              !erro &&
              ordenadas.map((solicitacao) => (
                <SolicitacaoCard
                  key={solicitacao.id}
                  solicitacao={solicitacao}
                />
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
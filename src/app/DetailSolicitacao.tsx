import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiSearch, FiSmile } from "react-icons/fi";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  ordemStatus,
  statusInfo,
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
  "Felipe Martins",
  "Gabriela Alves",
];

const statusPorSolicitacao: StatusSolicitacao[] = [
  "disponivel",
  "disponivel",
  "documentacao-pendente",
  "documentacao-pendente",
  "classificavel",
  "deferido",
  "indeferido",
];

const solicitacoesMock: Solicitacao[] = idsAuxilios.flatMap(
  (auxilioId, indiceAuxilio) =>
    statusPorSolicitacao.map((status, indiceSolicitacao) => {
      const numero =
        indiceAuxilio * statusPorSolicitacao.length + indiceSolicitacao + 1;

      return {
        id: `solicitacao-${numero}`,
        auxilioId,
        nome: nomesEstudantes[indiceSolicitacao],
        matricula: `2025${indiceAuxilio}${String(indiceSolicitacao + 1).padStart(3, "0")}`,
        cpf: String(numero).padStart(11, "0"),
        submetidaEm: "2026-01-01",
        status,
      };
    }),
);

const coresStatus: Record<StatusSolicitacao, string> = {
  disponivel: "bg-amber-400",
  "documentacao-pendente": "bg-orange-500",
  classificavel: "bg-blue-600",
  deferido: "bg-green-600",
  indeferido: "bg-rose-500",
};

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function mascararCpf(cpf: string) {
  const digitos = cpf.replace(/\D/g, "");

  if (digitos.length !== 11) return cpf;

  return `${digitos.slice(0, 3)}.***.***-${digitos.slice(-2)}`;
}

function formatarData(data: string) {
  return new Intl.DateTimeFormat("pt-BR").format(
    new Date(`${data}T12:00:00`),
  );
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

  const agora = new Date();
  const dataAtualizacao = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(agora);
  const horaAtualizacao = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(agora);

  return (
    <div className="flex min-h-screen flex-col border-t-4 border-[#082458] bg-white text-left ">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8 text-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs sm:text-sm">
            <nav aria-label="Navegação estrutural" className="flex items-center">
              <Link
                to="/PainelAdministrativo"
                className="text-blue-700 hover:underline"
              >
                Painel Geral
              </Link>
              <span className="mx-2 text-slate-400" aria-hidden="true">
                &gt;
              </span>
              <span aria-current="page">
                {nomeAuxilio ?? "Auxílio não encontrado"}
              </span>
            </nav>

            <p className="text-slate-500">
              Última atualização: {dataAtualizacao} - {horaAtualizacao}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3 sm:mt-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-blue-100 text-blue-700 sm:h-12 sm:w-12">
              <FiSmile aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>

            <h1 className="text-xl font-semibold leading-tight sm:text-2xl lg:text-3xl">
              {nomeAuxilio ?? "Auxílio não encontrado"}
            </h1>
          </div>

          <label htmlFor="busca-solicitacoes" className="sr-only">
            Buscar por nome, matrícula ou CPF
          </label>
          <div className="relative mt-4 sm:mt-5">
            <input
              id="busca-solicitacoes"
              type="search"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Digite nome, matrícula ou CPF"
              className="h-10 w-full rounded-md border border-slate-300 bg-white py-2 pl-4 pr-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:h-12"
            />
            <FiSearch
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600"
            />
          </div>

          {!carregando && !erro && (
            <section className="mt-5 sm:mt-6" aria-label="Totais por status">
              <h2 className="mb-2 text-xs font-medium uppercase text-slate-600">
                Total por status
              </h2>

              <div className="flex flex-wrap items-center gap-2 rounded-md border border-slate-300 bg-slate-50 p-3">
                {ordemStatus.map((status) => {
                  const total = solicitacoes.filter(
                    (item) => item.status === status,
                  ).length;

                  return (
                    <div
                      key={status}
                      className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-2 sm:px-3"
                    >
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium text-white sm:text-xs ${coresStatus[status]}`}
                      >
                        {statusInfo[status].label}
                      </span>
                      <span className="min-w-4 text-center text-xs font-bold text-slate-800 sm:text-sm">
                        {total}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="mt-6 sm:mt-8" aria-label="Solicitações">
            <h2 className="mb-3 text-xs font-medium uppercase text-slate-600">
              Solicitações
            </h2>

            <div className="space-y-2 sm:space-y-3">
              {carregando && (
                <div
                  role="status"
                  className="py-8 text-center text-sm text-slate-500"
                >
                  Carregando solicitações...
                </div>
              )}

              {!carregando && erro && (
                <div
                  role="alert"
                  className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
                >
                  <p>Falha ao carregar as solicitações.</p>
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
                <p className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
                  Nenhuma solicitação encontrada.
                </p>
              )}

              {!carregando &&
                !erro &&
                ordenadas.map((solicitacao) => (
                  <article
                    key={solicitacao.id}
                    className="grid grid-cols-2 items-center gap-x-3 gap-y-3 rounded-md border border-slate-300 bg-slate-50 p-3 sm:gap-4 sm:p-4 md:min-h-[76px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(150px,auto)_40px] md:items-center"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase text-slate-600 sm:text-xs">
                        CPF
                      </p>
                      <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                        {mascararCpf(solicitacao.cpf)}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] uppercase text-slate-600 sm:text-xs">
                        Data de submissão
                      </p>
                      <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                        {formatarData(solicitacao.submetidaEm)}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] uppercase text-slate-600 sm:text-xs md:text-center">
                        Status
                      </p>
                      <span
                        className={`inline-flex w-fit max-w-full rounded px-2 py-1 text-center text-[10px] font-medium leading-tight text-white sm:px-3 sm:text-xs md:whitespace-nowrap ${coresStatus[solicitacao.status]}`}
                      >
                        {statusInfo[solicitacao.status].label}
                      </span>
                    </div>

                    <Link
                      to={`/analise-solicitacao/${solicitacao.id}`}
                      aria-label={`Visualizar solicitação ${mascararCpf(solicitacao.cpf)}`}
                      className="flex h-8 w-8 items-center justify-center justify-self-end text-slate-900 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 md:justify-self-center"
                    >
                      <FiSearch aria-hidden="true" className="h-5 w-5" />
                    </Link>
                  </article>
                ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
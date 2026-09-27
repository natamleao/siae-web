import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import type { Solicitacao, StatusSolicitacao } from "../types/solicitacao";
import { statusInfo } from "../types/solicitacao";

type StatusBadgeProps = {
  status: StatusSolicitacao;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const info = statusInfo[status];

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${info.classes}`}>
      {info.label}
    </span>
  );
}

type SolicitacaoCardProps = {
  solicitacao: Solicitacao;
};

function mascararCpf(cpf: string) {
  const digitos = cpf.replace(/\D/g, "");
  if (digitos.length !== 11) return cpf;

  return `${digitos.slice(0, 3)}.***.***-${digitos.slice(-2)}`;
}

function formatarData(data: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${data}T12:00:00`));
}

export function SolicitacaoCard({ solicitacao }: SolicitacaoCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white transition hover:scale-[1.01] hover:border-blue-500">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900">{solicitacao.nome}</h3>
          <p className="mt-1 text-sm text-slate-600">
            Matrícula: {solicitacao.matricula}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm sm:w-64">
          <div>
            <dt className="text-xs text-slate-500">CPF</dt>
            <dd className="text-slate-800">{mascararCpf(solicitacao.cpf)}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Submetida em</dt>
            <dd className="text-slate-800">{formatarData(solicitacao.submetidaEm)}</dd>
          </div>
        </dl>

        <StatusBadge status={solicitacao.status} />

        <Link
          to={`/analise-solicitacao/${solicitacao.id}`}
          aria-label={`Visualizar detalhes da solicitação de ${solicitacao.nome}`}
          className="inline-flex shrink-0 items-center gap-2 font-semibold text-blue-700 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <FaSearch aria-hidden="true" />
          <span className="sm:hidden">Visualizar Detalhes</span>
        </Link>
      </div>
    </article>
  );
}
export const ordemStatus = [
  "disponivel",
  "documentacao-pendente",
  "classificavel",
  "deferido",
  "indeferido",
] as const;

export type StatusSolicitacao = (typeof ordemStatus)[number];

export type Solicitacao = {
  id: string;
  auxilioId: string;
  nome: string;
  matricula: string;
  cpf: string;
  submetidaEm: string;
  status: StatusSolicitacao;
};

export const statusInfo: Record<
  StatusSolicitacao,
  { label: string; classes: string }
> = {
  disponivel: {
    label: "Disponível para Análise",
    classes: "bg-amber-100 text-amber-900",
  },
  "documentacao-pendente": {
    label: "Documentação Pendente",
    classes: "bg-orange-100 text-orange-900",
  },
  classificavel: {
    label: "Classificável",
    classes: "bg-blue-100 text-blue-900",
  },
  deferido: {
    label: "Deferido",
    classes: "bg-green-100 text-green-900",
  },
  indeferido: {
    label: "Indeferido",
    classes: "bg-red-100 text-red-900",
  },
};
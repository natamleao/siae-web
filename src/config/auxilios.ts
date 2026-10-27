export type StatusSolicitacao =
    | 'Disponível para Análise'
    | 'Documentação Pendente'
    | 'Classificável'
    | 'Deferido'
    | 'Indeferido';

// Cores exatas do Figma (node 1468:7231, componente "Status Solicitações Novo").
export const STATUS_STYLES: Record<StatusSolicitacao, { bg: string; text: string }> = {
    'Disponível para Análise': { bg: '#fff2c2', text: '#b48d00' },
    'Documentação Pendente': { bg: '#ffddce', text: '#e04300' },
    Classificável: { bg: '#c5dbff', text: '#073989' },
    Deferido: { bg: '#c7ffc7', text: '#008000' },
    Indeferido: { bg: '#ffc9cd', text: '#c1121f' },
};

export interface Auxilio {
    id: string;
    nome: string;
    descricao: string;
    disponivel: boolean;
}

export interface Solicitacao {
    id: string;
    auxilioNome: string;
    dataSubmissao: string;
    status: StatusSolicitacao;
}

// Dados mockados — não há endpoint de auxílios/solicitações ainda.
export const AUXILIOS_MOCK: Auxilio[] = [
    {
        id: 'creche',
        nome: 'Auxílio Creche',
        descricao: 'Para estudantes em situação de vulnerabilidade socioeconômica que tenham filhos.',
        disponivel: true,
    },
    {
        id: 'isencao-ru',
        nome: 'Isenção Parcial do RU',
        descricao: 'Para estudantes em situação de vulnerabilidade socioeconômica.',
        disponivel: false,
    },
    {
        id: 'ingressante',
        nome: 'Auxílio Ingressante',
        descricao: 'Para estudantes ingressantes em situação de vulnerabilidade socioeconômica.',
        disponivel: true,
    },
    {
        id: 'emergencial',
        nome: 'Auxílio Emergencial',
        descricao: 'Para estudantes em situação de vulnerabilidade que atendam a alguns requisitos.',
        disponivel: false,
    },
];

export const SOLICITACOES_MOCK: Solicitacao[] = [
    { id: '1', auxilioNome: 'Auxílio Emergencial', dataSubmissao: '01/01/2026', status: 'Documentação Pendente' },
    { id: '2', auxilioNome: 'Isenção Parcial do RU', dataSubmissao: '01/01/2026', status: 'Classificável' },
    { id: '3', auxilioNome: 'Auxílio Ingressante', dataSubmissao: '01/01/2026', status: 'Deferido' },
    { id: '4', auxilioNome: 'Auxílio Ingressante', dataSubmissao: '01/01/2026', status: 'Indeferido' },
    { id: '5', auxilioNome: 'Auxílio Ingressante', dataSubmissao: '01/01/2026', status: 'Disponível para Análise' },
];

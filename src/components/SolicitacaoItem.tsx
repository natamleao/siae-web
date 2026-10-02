import { useState } from 'react';
import type { IconType } from 'react-icons';
import { FaChevronDown, FaMagnifyingGlass } from 'react-icons/fa6';
import { STATUS_STYLES, type Solicitacao } from '../config/auxilios';

interface SolicitacaoItemProps {
    solicitacao: Solicitacao;
    icon: IconType;
}

export function SolicitacaoItem({ solicitacao, icon: Icon }: SolicitacaoItemProps) {
    const { auxilioNome, dataSubmissao, status } = solicitacao;
    const statusStyle = STATUS_STYLES[status];
    const [expanded, setExpanded] = useState(false);

    const statusBadge = (
        <span
            className="rounded-[14px] h-[27px] px-3 flex items-center justify-center text-[12px] font-bold whitespace-nowrap"
            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
        >
            {status}
        </span>
    );

    return (
        <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="bg-[#f9fbff] border border-[#b5b5b5] rounded-[8px] w-full flex flex-col text-left max-md:cursor-pointer md:cursor-default"
        >
            {/* Desktop: linha única, igual ao Figma. Some no mobile (M8|P9 - vira acordeão). */}
            <div className="hidden md:flex items-center h-[106px] px-[40px] gap-3 w-full">
                <div className="bg-[#c1d4ff] rounded-[6px] w-[48px] h-[50px] flex items-center justify-center shrink-0">
                    <Icon className="text-[#1058cc]" size={22} />
                </div>
                <p className="font-semibold text-black text-[20px] w-[210px]">{auxilioNome}</p>
                <div className="flex-1 flex flex-col items-center text-black">
                    <p className="text-[#646262] text-[11px]">DATA DE SUBMISSÃO</p>
                    <p className="font-bold text-[20px]">{dataSubmissao}</p>
                </div>
                <div className="flex flex-col items-end gap-1 w-[163px]">
                    <p className="text-[#646262] text-[11px] font-semibold">STATUS</p>
                    {statusBadge}
                </div>
                <FaMagnifyingGlass className="text-black shrink-0" size={20} />
            </div>

            {/* Mobile: cabeçalho do acordeão. Detalhes só aparecem expandido (M8|P9). */}
            <div className="flex md:hidden items-center h-[72px] px-4 gap-3 w-full">
                <div className="bg-[#c1d4ff] rounded-[6px] w-[40px] h-[42px] flex items-center justify-center shrink-0">
                    <Icon className="text-[#1058cc]" size={18} />
                </div>
                <p className="font-semibold text-black text-[16px] flex-1 truncate">{auxilioNome}</p>
                <FaChevronDown
                    className={`text-black shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
                    size={14}
                />
            </div>
            {expanded && (
                <div className="flex md:hidden flex-col gap-2 px-4 pb-4">
                    <div className="flex justify-between items-center">
                        <p className="text-[#646262] text-[11px]">DATA DE SUBMISSÃO</p>
                        <p className="font-bold text-[14px]">{dataSubmissao}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-[#646262] text-[11px] font-semibold">STATUS</p>
                        {statusBadge}
                    </div>
                    <div className="flex items-center gap-1 text-black self-end">
                        <FaMagnifyingGlass size={16} />
                        <span className="text-[13px]">Ver detalhes</span>
                    </div>
                </div>
            )}
        </button>
    );
}

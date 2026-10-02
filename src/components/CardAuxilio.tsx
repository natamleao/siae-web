import type { IconType } from 'react-icons';
import type { Auxilio } from '../config/auxilios';

interface CardAuxilioProps {
    auxilio: Auxilio;
    icon: IconType;
}

export function CardAuxilio({ auxilio, icon: Icon }: CardAuxilioProps) {
    const { nome, descricao, disponivel } = auxilio;

    return (
        <div className="bg-[#f9fbff] border border-[#b5b5b5] rounded-[8px] w-full md:w-[260px] h-auto md:h-[289px] p-[25px] flex flex-col shrink-0">
            <div className="flex items-center gap-3">
                <div className="bg-[#c1d4ff] rounded-[6px] w-[54px] h-[56px] flex items-center justify-center shrink-0">
                    <Icon className="text-[#1058cc]" size={26} />
                </div>
                <p className="font-semibold text-black text-[20px]">{nome}</p>
            </div>
            <p className="text-black text-[15px] mt-4">{descricao}</p>
            <div className="mt-auto flex flex-col gap-3">
                <span
                    className="rounded-[10px] h-[22px] w-[209px] flex items-center justify-center text-[12px] font-bold"
                    style={{
                        backgroundColor: disponivel ? '#c7ffc7' : '#b5b5b5',
                        color: disponivel ? 'green' : 'black',
                    }}
                >
                    {disponivel ? 'Disponível' : 'Indisponível'}
                </span>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="border border-[#1058ccb3] bg-white rounded-[8px] px-3 py-1.5 text-[12px] font-semibold text-black"
                    >
                        Saiba mais
                    </button>
                    {disponivel && (
                        <button
                            type="button"
                            className="bg-[#1058cc] rounded-[8px] px-3 py-1.5 text-[13px] font-semibold text-white"
                        >
                            Solicitar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

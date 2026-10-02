import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBaby, FaUserPlus, FaUtensils } from 'react-icons/fa6';
import { TbUrgent } from 'react-icons/tb';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AvisosCarrossel } from '../components/AvisosCarrossel';
import { CardAuxilio } from '../components/CardAuxilio';
import { SolicitacaoItem } from '../components/SolicitacaoItem';
import { useAuthContext } from '../context/AuthContext';
import { AUXILIOS_MOCK, SOLICITACOES_MOCK } from '../config/auxilios';

const AUXILIO_ICONS: Record<string, typeof FaBaby> = {
    creche: FaBaby,
    'isencao-ru': FaUtensils,
    ingressante: FaUserPlus,
    emergencial: TbUrgent,
};

const SOLICITACAO_ICONS: Record<string, typeof FaBaby> = {
    'Auxílio Emergencial': TbUrgent,
    'Isenção Parcial do RU': FaUtensils,
    'Auxílio Ingressante': FaUserPlus,
    'Auxílio Creche': FaBaby,
};

function CardsSkeleton() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:gap-[13px] md:flex-wrap">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse rounded-[8px] w-full md:w-[260px] h-[220px] md:h-[289px]" />
            ))}
        </div>
    );
}

export function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuthContext();

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
                logout();
                navigate('/');
            }
        };

        getUserData();
    }, [logout, navigate]);

    return (
        <main className="flex flex-col min-h-screen">
            <Header />

            <section className="bg-white grow flex flex-col items-center py-8 gap-10 px-[132px] max-md:px-6">
                <div className="w-full max-w-[1080px]">
                    {loading ? (
                        <div className="w-full h-[350px] rounded-[8px] bg-gray-100 animate-pulse" />
                    ) : (
                        <AvisosCarrossel />
                    )}
                </div>

                <div className="w-full max-w-[1080px] flex flex-col gap-4">
                    <div>
                        <h2 className="font-semibold text-[32px] text-black">Conheça os Auxílios</h2>
                        <p className="text-black text-[15px]">
                            Veja quais auxílios a Assistência Estudantil oferece, e se eles estão disponíveis para solicitação.
                        </p>
                    </div>


                        </div>
                    )}
                </div>

                <div className="w-full max-w-[1080px] flex flex-col items-end gap-6">
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="font-semibold text-[32px] text-black">Minhas solicitações</h2>
                        <p className="text-black text-[15px]">Acompanhe as solicitações de auxílios que você fez.</p>
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        {loading
                            ? Array.from({ length: 3 }).map((_, i) => (
                                  <div key={i} className="bg-gray-100 animate-pulse rounded-[8px] w-full h-[106px]" />
                              ))
                            : SOLICITACOES_MOCK.map((solicitacao) => (
                                  <SolicitacaoItem
                                      key={solicitacao.id}
                                      solicitacao={solicitacao}
                                      icon={SOLICITACAO_ICONS[solicitacao.auxilioNome]}
                                  />
                              ))}
                    </div>

                    <button
                        type="button"
                        className="bg-[#1058cc] rounded-[8px] px-5 py-3 text-white font-semibold text-[16px] w-[220px]"
                    >
                        Nova solicitação
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}

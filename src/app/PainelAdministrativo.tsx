import { FaBell, FaClock, FaExclamationTriangle, FaFileAlt, FaSmile, FaUtensils, FaUserPlus } from "react-icons/fa";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AidCard, MetricCard, NoticeItem } from "../components/PainelCards";

const aids = [
  {
    id: "auxilio-creche",
    title: "Auxílio Creche",
    received: 100,
    underReview: 30,
    icon: "/icone-painel-geral/CrecheIcon.png",
  },
  {
    id: "isencao-ru",
    title: "Isenção Parcial do RU",
    received: 100,
    underReview: 30,
    icon: "/icone-painel-geral/refeicaoIcon.png",
  },
  {
    id: "auxilio-ingressante",
    title: "Auxílio Ingressante",
    received: 100,
    underReview: 30,
    icon: "/icone-painel-geral/AddIcon.png",
  },
  {
    id: "auxilio-emergencial",
    title: "Auxílio Emergencial",
    received: 100,
    underReview: 30,
    icon: "/icone-painel-geral/AuxilioIcon.png",
  },
];

export function PainelAdministrativo() {
  const now = new Date();
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });
  const timeFormatter = new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" });
  const updatedAt = `${dateFormatter.format(now)} - ${timeFormatter.format(now)}`;

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 ">
      <Header/>

      <section className="w-full flex-1 text-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="mb-6 text-right text-xs text-[#073989]">
            Última atualização: {updatedAt}
          </p>

          <h1 className="text-2xl font-bold">Painel Geral</h1>
          <p className="mt-1 text-sm text-slate-600">
           Acompanhe o andamento de todos os auxílios ativos e suas respectivas solicitações.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <section aria-labelledby="aids-heading">
              <h2 id="aids-heading" className="mb-1 text-lg font-semibold">
                Acompanhamento das Solicitações de Auxílios
              </h2>
              <p className="mb-4 text-sm text-slate-600">
                Selecione um dos cards abaixo para visualizar o painel de cada auxílio:              </p>

              <div className="space-y-3">
                {aids.map((aid) => (
                    <AidCard
                    key={aid.id}
                    {...aid}
                    to={`/detalhe-solicitacao/${aid.id}`}
                    />
                ))}
                </div>
            </section>

            <aside aria-labelledby="metrics-heading">
              <h2 id="metrics-heading" className="mb-4 text-lg font-semibold">
                Estatísticas Gerais
              </h2>
              <div className="space-y-3">
                <MetricCard
                  label="Novas solicitações recebidas"
                  value="150"
                  period="nesta semana"
                  icon={
                    <img
                      src="/graficoIcon.png"
                      alt=""
                      aria-hidden="true"
                      className="size-15 shrink-0 opacity-60"
                    />
                  }
                  tone="blue"
                />
                <MetricCard
                  label="Documentos pendentes reenviados"
                  value="80"
                  period="nesta semana"
                  icon={
                    <img
                      src="/documentIcon.png"
                      alt=""
                      aria-hidden="true"
                      className="size-15 shrink-0 opacity-60"
                    />
                  }
                  tone="royal"
                />
                <MetricCard
                  label="Tempo médio de análise atual"
                  value="3"
                  period="horas"
                  icon={
                    <img
                      src="/relogioIcon.png"
                      alt=""
                      aria-hidden="true"
                      className="size-15 shrink-0 opacity-60"
                    />
                  }
                  tone="navy"
                />
              </div>
            </aside>
          </div>

          <section aria-labelledby="notices-heading" className="mt-8 border-t border-slate-200 pt-5">
            <h2 id="notices-heading" className="mb-3 text-lg font-semibold">
              Avisos e notificações internas
            </h2>
            <div className="divide-y border-y border-slate-200 bg-white">
              <NoticeItem
                label="Aviso:"
                message="Sistema em manutenção amanhã, das 10h às 12h."
                time="Hoje, 09:15"
                icon={"/icone-painel-geral/NotificacaoIcon.png"}
                kind="info"
              />
              <NoticeItem
                label="Alerta:"
                message="280 solicitações pendentes de análise."
                time="Ontem, 14:50"
                icon={"/icone-painel-geral/AlertaIcon.png"}
                kind="warning"
              />
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
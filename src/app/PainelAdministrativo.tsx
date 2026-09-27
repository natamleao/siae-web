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
    icon: FaSmile,
  },
  {
    id: "isencao-ru",
    title: "Isenção Parcial do RU",
    received: 100,
    underReview: 30,
    icon: FaUtensils,
  },
  {
    id: "auxilio-ingressante",
    title: "Auxílio Ingressante",
    received: 100,
    underReview: 30,
    icon: FaUserPlus,
  },
  {
    id: "auxilio-emergencial",
    title: "Auxílio Emergencial",
    received: 100,
    underReview: 30,
    icon: FaBell,
  },
];

export function PainelAdministrativo() {
  const updatedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 ">
      <Header/>

      <section className="w-full flex-1 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="mb-6 text-right text-xs text-slate-500">
            Última atualização: {updatedAt}
          </p>

          <h1 className="text-2xl font-bold">Painel Geral</h1>
          <p className="mt-1 text-sm text-slate-600">
            Acompanhe o andamento dos auxílios e suas solicitações.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <section aria-labelledby="aids-heading">
              <h2 id="aids-heading" className="mb-1 text-lg font-semibold">
                Acompanhamento das Solicitações de Auxílios
              </h2>
              <p className="mb-4 text-sm text-slate-600">
                Selecione um auxílio para visualizar suas solicitações.
              </p>

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
                  icon={FaFileAlt}
                  tone="blue"
                />
                <MetricCard
                  label="Documentos pendentes reenviados"
                  value="80"
                  period="nesta semana"
                  icon={FaFileAlt}
                  tone="royal"
                />
                <MetricCard
                  label="Tempo médio de análise atual"
                  value="3"
                  period="horas"
                  icon={FaClock}
                  tone="navy"
                />
              </div>
            </aside>
          </div>

          <section aria-labelledby="notices-heading" className="mt-8 border-t border-slate-200 pt-5">
            <h2 id="notices-heading" className="mb-3 text-lg font-semibold">
              Avisos e notificações internas
            </h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
              <NoticeItem
                label="Aviso:"
                message="Sistema em manutenção amanhã, das 10h às 12h."
                time="Hoje, 09:15"
                icon={FaBell}
                kind="info"
              />
              <NoticeItem
                label="Alerta:"
                message="280 solicitações pendentes de análise."
                time="Ontem, 14:50"
                icon={FaExclamationTriangle}
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
import type { IconType } from "react-icons";
import { Link } from "react-router-dom";

type AidCardProps = {
  title: string;
  received: number;
  underReview: number;
  icon: IconType;
  to: string;
};

export function AidCard({
  title,
  received,
  underReview,
  icon: Icon,
  to,
}: AidCardProps) {
  return (
    <Link
      to={to}
      className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-4 no-underline transition hover:scale-[1.01] hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:flex-row sm:items-center"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-800">
        <Icon aria-hidden="true" className="size-5" />
      </span>

      <h3 className="min-w-0 flex-1 font-semibold text-slate-900">
        {title}
      </h3>

      <dl className="grid grid-cols-2 gap-4 sm:w-44">
        <div>
          <dt className="text-xs uppercase text-slate-500">Recebidos</dt>
          <dd className="text-lg font-bold text-slate-900">{received}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500">Em análise</dt>
          <dd className="text-lg font-bold text-slate-900">{underReview}</dd>
        </div>
      </dl>

      <span className="font-semibold text-blue-700">Ver solicitações</span>
    </Link>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  period: string;
  icon: IconType;
  tone: "blue" | "royal" | "navy";
};

const metricTones = {
  blue: "bg-blue-600",
  royal: "bg-blue-700",
  navy: "bg-blue-900",
};

export function MetricCard({
  label,
  value,
  period,
  icon: Icon,
  tone,
}: MetricCardProps) {
  return (
    <article className={`flex items-center justify-between gap-4 rounded-md p-4 text-white ${metricTones[tone]}`}>
      <div>
        <h3 className="text-xs font-semibold uppercase">{label}</h3>
        <p className="mt-2">
          <strong className="text-2xl">{value}</strong>
          <span className="ml-3 text-sm">{period}</span>
        </p>
      </div>
      <Icon aria-hidden="true" className="size-8 shrink-0 opacity-60" />
    </article>
  );
}

type NoticeItemProps = {
  label: string;
  message: string;
  time: string;
  icon: IconType;
  kind: "info" | "warning";
};

export function NoticeItem({
  label,
  message,
  time,
  icon: Icon,
  kind,
}: NoticeItemProps) {
  const appearance = kind === "warning"
    ? "bg-amber-100 text-amber-800"
    : "bg-blue-100 text-blue-800";

  return (
    <article className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${appearance}`}>
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <p className="min-w-0 flex-1 text-sm text-slate-700">
        <strong className="mr-3 text-slate-900">{label}</strong>
        {message}
      </p>
      <time className="shrink-0 text-xs uppercase text-slate-500">{time}</time>
    </article>
  );
}
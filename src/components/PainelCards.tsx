import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type AidCardProps = {
  title: string;
  received: number;
  underReview: number;
  icon: IconType | string;
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
      className="flex flex-col gap-4 max-w-[40rem] rounded-md border border-slate-300 bg-slate-50 p-6 no-underline transition hover:scale-[1.01] hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:flex-row sm:items-center"
    >
      
        {typeof Icon === "string" ? (
          <img
            src={Icon}
            alt=""
            aria-hidden="true"
            className="size-14 object-contain"
          />
        ) : (
          <Icon aria-hidden="true" className="size-5" />
        )}
      

      <h3 className="min-w-0 flex-1 font-semibold text-slate-900">
        {title}
      </h3>

      <dl className="grid grid-cols-2 gap-8 sm:w-44 ">
        <div >
          <dt className="text-xs text-right uppercase text-slate-500">Recebidos</dt>
          <dd className="text-lg text-right font-bold text-slate-900 ">{received}</dd>
        </div>
        <div>
          <dt className="text-xs text-right uppercase text-slate-500">Em análise</dt>
          <dd className="text-lg text-right font-bold text-slate-900">{underReview}</dd>
        </div>
      </dl>

   
    </Link>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  period: string;

  icon: ReactNode;
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
  icon,
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
      {icon}
    </article>
  );
}

type NoticeItemProps = {
  label: string;
  message: string;
  time: string;
  icon: IconType | string;
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
    <article className="flex flex-col rounded-md gap-3 p-4 mb-2 sm:flex-row sm:items-center border border-[#B5B5B5] bg-[#F9FBFF]">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${appearance}`}>
        {typeof Icon === "string" ? (
          <img
            src={Icon}
            alt=""
            aria-hidden="true"
            className="size-14 object-contain"
          />
        ) : (
          <Icon aria-hidden="true" className="size-5" />
        )}
      </span>
      <p className="min-w-0 flex-1 text-sm text-slate-700">
        <strong className="mr-3 text-slate-900">{label}</strong>
        {message}
      </p>
      <time className="shrink-0 text-xs uppercase text-slate-500">{time}</time>
    </article>
  );
}
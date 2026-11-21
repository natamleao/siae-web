const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });
const timeFormatter = new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" });

export function formatDateTime(date: Date = new Date()): string {
  return `${dateFormatter.format(date)} - ${timeFormatter.format(date)}`;
}
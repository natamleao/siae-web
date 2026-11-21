#!/bin/sh
set -eu

TEMPLATE="/etc/siae/runtime-config.js.template"
OUTPUT="/usr/share/nginx/html/config.js"

if [ -z "${API_URL:-}" ]; then
    echo "ERRO: a variável API_URL é obrigatória." >&2
    exit 1
fi

if ! awk -v url="$API_URL" '
BEGIN {
    if (url !~ /^https:\/\/[A-Za-z0-9.-]+(:[0-9]+)?(\/[A-Za-z0-9._~!$&()*+,;=:@\/-]*)?$/)
        exit 1

    authority = url
    sub(/^https:\/\//, "", authority)
    sub(/\/.*/, "", authority)

    count = split(authority, parts, ":")

    if (count > 2)
        exit 1

    host = parts[1]

    if (length(host) > 253 || host !~ /^[A-Za-z0-9.-]+$/)
        exit 1

    labels = split(host, domains, ".")

    for (i = 1; i <= labels; i++) {
        if (length(domains[i]) < 1 || length(domains[i]) > 63)
            exit 1

        if (domains[i] !~ /^[A-Za-z0-9]/ || domains[i] !~ /[A-Za-z0-9]$/)
            exit 1
    }

    if (count == 2) {
        port = parts[2]

        if (port !~ /^[0-9]+$/ || port < 1 || port > 65535)
            exit 1
    }
}
'; then
    echo "ERRO: API_URL inválida. Informe uma URL HTTPS válida." >&2
    exit 1
fi

if [ ! -f "$TEMPLATE" ]; then
    echo "ERRO: template de configuração não encontrado." >&2
    exit 1
fi

envsubst '${API_URL}' < "$TEMPLATE" > "$OUTPUT"

chmod 644 "$OUTPUT"

echo "Configuração de runtime gerada com sucesso."

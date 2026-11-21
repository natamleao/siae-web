FROM node:22-alpine AS build

WORKDIR /app

RUN npm install -g pnpm@12.3.4

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY docker/runtime-config.js.template /etc/siae/runtime-config.js.template
COPY docker/40-runtime-config.sh /docker-entrypoint.d/40-runtime-config.sh

RUN chmod 755 /docker-entrypoint.d/40-runtime-config.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

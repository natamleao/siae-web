# 💼 SIAE Web

Este repositório contém o **código-fonte do frontend** da aplicação **SIAE** — *Sistema Integrado de Assistência Estudantil*, desenvolvida para **facilitar a gestão do Auxílio Emergencial na UFC Russas**.

O projeto busca oferecer uma interface moderna, responsiva e acessível para estudantes e servidores, simplificando o acompanhamento e a administração dos auxílios estudantis.

---

## 📚 Sumário

- [💼 SIAE Web](#-siae-web)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📁 Estrutura de Pastas](#-estrutura-de-pastas)
- [🧭 Fluxo de Desenvolvimento](#-fluxo-de-desenvolvimento)
- [🧰 Como Rodar o Projeto](#-como-rodar-o-projeto)
  - [Pré-requisitos](#-pré-requisitos)
  - [Execução local](#-execução-local)
  - [Execução com Docker](#-execução-com-docker)
- [📄 Licença](#-licença)

---

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologias |
|---|---|
| **Frontend** | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Estilização** | [Tailwind CSS](https://tailwindcss.com/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) *(em breve)* |
| **Containerização** | [Docker](https://www.docker.com/) + Docker Compose |
| **Deploy** | [Vercel](https://vercel.com/) *(em breve)* |

---

## 📁 Estrutura de Pastas

| Caminho | Função / Conteúdo |
|---|---|
| `docs/` | Documentação do projeto. |
| `public/` | Arquivos estáticos públicos (favicon, imagens, manifest). |
| `src/` | Código-fonte principal da aplicação. |
| `src/app/` | Componente raiz e estrutura central (ex.: `App.tsx`). |
| `src/components/` | Componentes reutilizáveis de UI. |
| `src/hooks/` | Hooks customizados (ex.: `useFetch`, `useAuth`). |
| `src/index.css` | Estilos globais e diretivas do Tailwind. |
| `src/main.tsx` | Ponto de entrada do React/Vite. |
| `index.html` | Template HTML base usado pelo Vite. |
| `vite.config.ts` | Configurações do Vite (plugins, aliases). |
| `tsconfig.json` | Configuração TypeScript principal. |
| `tsconfig.app.json` | Configuração TS da aplicação (Vite/Web). |
| `tsconfig.node.json` | Configuração TS para ambiente Node/Vite. |
| `eslint.config.js` | Regras de linting (boas práticas de código). |
| `package.json` | Scripts e dependências do projeto. |
| `pnpm-lock.yaml` | Lockfile do pnpm (versões exatas das dependências). |
| `docker-compose.yml` | Configuração do serviço Docker do frontend. |
| `Dockerfile` | Instruções para construção da imagem Docker. |
| `.env.example` | Modelo das variáveis de ambiente necessárias. |
| `README.md` | Documentação principal do repositório. |
| `LICENSE` | Licença do projeto. |

---

## 🧭 Fluxo de Desenvolvimento

### 🌱 Branches principais

| Branch | Descrição |
|---|---|
| **main** | Contém o código em produção (versão estável). |
| **develop** | Branch principal de desenvolvimento. Aqui são integradas as features antes de irem para `main`. |

### 🌱 Branches secundárias

Adotamos o seguinte padrão de nomenclatura para criação de branches:

> **Formato:** `AÇÃO/SIAE-NUMERO_DA_TASK/descricao-resumida`
>
> **Exemplo:** `DC/SIAE-01/aderindo-swagger`

| Descrição da Ação | Ação (Prefixo) | Convenção de Nome | Exemplo | Uso |
|---|:---:|---|---|---|
| **FEATURE** | `FT` | `FT/SIAE-XXX/descricao` | `FT/SIAE-12/tela-login` | Novas funcionalidades. |
| **REFACTORING** | `RF` | `RF/SIAE-XXX/descricao` | `RF/SIAE-45/refatorando-auth` | Refatorações de código sem alterar comportamento. |
| **FIX** | `FX` | `FX/SIAE-XXX/descricao` | `FX/SIAE-78/ajuste-validacao` | Correções de bugs ou ajustes pontuais. |
| **HOTFIX** | `HT` | `HT/SIAE-XXX/descricao` | `HT/SIAE-99/correcao-urgente` | Correções urgentes que precisam ir diretamente para `main`. |
| **DOCUMENTATION** | `DC` | `DC/SIAE-XXX/descricao` | `DC/SIAE-01/atualiza-readme` | Atualizações ou adições em documentação. |

> [!CAUTION]
> Os números devem estar de acordo com o informado no detalhamento da task no ClickUp.

### ⚙️ Passo a passo para contribuir

1. **Crie uma nova branch a partir de `develop`:**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b FT/SIAE-XX/nome-da-task
   ```

2. **Faça commits incrementais e descritivos:**

   ```bash
   git add .
   git commit -m "feat: adiciona tela de login"
   git push -u origin FT/SIAE-XX/nome-da-task
   ```

3. **Ao concluir, abra um Pull Request para `develop` e solicite revisão.**

4. **Após aprovação, o código é mesclado em `develop`.**

5. **Quando houver uma versão estável, `develop` é mesclado em `main`.**

---

## 🧰 Como Rodar o Projeto

O projeto pode ser executado de duas maneiras: localmente, utilizando Node.js e pnpm, ou por meio de containers Docker.

### 🪄 Pré-requisitos

#### Para execução local

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 22 ou superior).
- [pnpm](https://pnpm.io/).
- [Git](https://git-scm.com/).

Verifique as versões com:

```bash
node -v
pnpm -v
git --version
```

#### Para execução com Docker

- [Docker Engine](https://docs.docker.com/engine/install/).
- [Docker Compose](https://docs.docker.com/compose/install/).

Verifique as instalações:

```bash
docker --version
docker compose version
```

### 💻 Execução local

#### 1. Clonar o repositório

```bash
git clone https://github.com/devsiae-ludi/siae-web.git
cd siae-web
```

#### 2. Instalar as dependências

```bash
pnpm install
```

#### 3. Configurar as variáveis de ambiente

Crie o arquivo `.env` a partir do modelo disponibilizado:

```bash
cp .env.example .env
```

Configure o endereço da API no arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000
```

#### 4. Executar o servidor de desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em:

👉 **http://localhost:5173**

### 🐳 Execução com Docker

O frontend também pode ser executado utilizando Docker Compose, dispensando a instalação local das dependências do projeto.

#### 1. Clonar o repositório

```bash
git clone https://github.com/devsiae-ludi/siae-web.git
cd siae-web
```

#### 2. Configurar as variáveis de ambiente

Crie o arquivo `.env` com base no modelo:

```bash
cp .env.example .env
```

Configure a URL da API:

```env
VITE_API_URL=http://localhost:3000
```

**Importante:** a variável `VITE_API_URL` é utilizada durante a construção da imagem Docker. Portanto, alterações nessa variável exigem a reconstrução da imagem.

#### 3. Construir e iniciar o container

```bash
docker compose up -d --build
```

#### 4. Acessar a aplicação

Após a inicialização, o frontend estará disponível em:

👉 **http://localhost:8080**

#### 5. Gerenciar o container

Para visualizar os containers em execução:

```bash
docker compose ps
```

Para acompanhar os logs:

```bash
docker compose logs -f frontend
```

Para interromper a aplicação:

```bash
docker compose down
```

Para reconstruir a imagem após alterações no código ou nas variáveis de build:

```bash
docker compose up -d --build
```

> **Observação:** a execução do frontend em Docker não inicia automaticamente a API ou o banco de dados. Esses serviços possuem configuração e gerenciamento próprios. Certifique-se de que a API esteja em execução e que o endereço configurado em `VITE_API_URL` seja acessível pelo navegador.

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** — isso significa que você pode usar, copiar, modificar e distribuir este código livremente, desde que mantenha o aviso de direitos autorais e a licença original.

---

Desenvolvido com 💙 pela **Equipe SIAE - LUDI**, unindo tecnologia e propósito para aprimorar a experiência estudantil na UFC Russas.
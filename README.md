# 💼 SIAE Web

Este repositório contém o **código-fonte do frontend** para a aplicação **SIAE** — *Sistema Integrado de Assistência Estudantil*, desenvolvida para **facilitar a gestão do Auxílio Emergencial na UFC Russas**.

O projeto busca oferecer uma interface moderna, responsiva e acessível para estudantes e servidores, simplificando o acompanhamento e a administração dos auxílios estudantis.

---

## 📚 Sumário

* [💼 SIAE Web](#-siae-web)
* [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [📁 Estrutura de Pastas](#-estrutura-de-pastas)
* [🧭 Fluxo de Desenvolvimento](#-fluxo-de-desenvolvimento)
* [🧰 Como Rodar o Projeto](#-como-rodar-o-projeto)
* [📄 Licença](#-licença)

---

## 🚀 Tecnologias Utilizadas

| Categoria       | Tecnologias                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| **Frontend**    | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Estilização** | [Tailwind CSS](https://tailwindcss.com/)                                    |
| **Build Tool**  | [Vite](https://vitejs.dev/)                                                 |
| **HTTP Client** | [Axios](https://axios-http.com/) *(em breve)*                               |
| **Deploy**      | [Vercel](https://vercel.com/) *(em breve)*                                  |

---

## 📁 Estrutura de Pastas

| Caminho              | Função / Conteúdo                                         |
| -------------------- | --------------------------------------------------------- |
| `docs/`              | Documentação do projeto.                                  |
| `public/`            | Arquivos estáticos públicos (favicon, imagens, manifest). |
| `src/`               | Código-fonte principal da aplicação.                      |
| `src/app/`           | Componente raiz e estrutura central (ex.: `App.tsx`).     |
| `src/components/`    | Componentes reutilizáveis de UI.                          |
| `src/hooks/`         | Hooks customizados (ex.: `useFetch`, `useAuth`).          |
| `src/index.css`      | Estilos globais + diretivas do Tailwind.                  |
| `src/main.tsx`       | Ponto de entrada do React/Vite.                           |
| `index.html`         | Template HTML base usado pelo Vite.                       |
| `vite.config.ts`     | Configurações do Vite (plugins, aliases).                 |
| `tsconfig.json`      | Configuração TypeScript principal.                        |
| `tsconfig.app.json`  | Configuração TS da aplicação (Vite/Web).                  |
| `tsconfig.node.json` | Configuração TS para ambiente Node/Vite.                  |
| `eslint.config.js`   | Regras de linting (boas práticas de código).              |
| `package.json`       | Scripts e dependências do projeto.                        |
| `pnpm-lock.yaml`     | Lockfile do pnpm (versões exatas das dependências).       |
| `README.md`          | Documentação principal do repositório.                    |
| `LICENSE`            | Licença do projeto.                                       |

---

## 🧭 Fluxo de Desenvolvimento

### 🌱 Branches principais

| Branch      | Descrição                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------- |
| **main**    | Contém o código em produção (versão estável).                                                   |
| **develop** | Branch principal de desenvolvimento. Aqui são integradas as features antes de irem para `main`. |

---

### 🌱 Branches secundárias

Adotamos o seguinte padrão de nomenclatura para criação de branches:

> **Formato:** `AÇÃO/SIAE-NUMERO_DA_TASK/descricao-resumida`
>
> **Exemplo:** `DC/SIAE-01/Aderindo-swagger`

| Descrição da Ação | Ação (Prefixo) | Convenção de Nome       | Exemplo                       | Uso                                                    |
| ----------------- | :------------: | ----------------------- | ----------------------------- | ------------------------------------------------------ |
| **FEATURE**       |      `FT`      | `FT/SIAE-XXX/descricao` | `FT/SIAE-12/tela-login`       | Novas funcionalidades.                                 |
| **REFACTORING**   |      `RF`      | `RF/SIAE-XXX/descricao` | `RF/SIAE-45/refatorando-auth` | Refatorações de código sem alterar comportamento.      |
| **FIX**           |      `FX`      | `FX/SIAE-XXX/descricao` | `FX/SIAE-78/ajuste-validacao` | Correções de bugs ou ajustes pontuais.                 |
| **HOTFIX**        |      `HT`      | `HT/SIAE-XXX/descricao` | `HT/SIAE-99/correcao-urgente` | Correções urgentes que precisam ir direto para `main`. |
| **DOCUMENTATION** |      `DC`      | `DC/SIAE-XXX/descricao` | `DC/SIAE-01/Aderindo-swagger` | Atualizações ou adições em documentação.               |

> [!CAUTION]
> Os números devem estar de acordo com o informado no detalhamento da task no ClickUp.

### ⚙️ Passo a passo para contribuir

1. **Crie uma nova branch a partir de `develop`:**

   ```bash
   git checkout develop
   git pull
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

Siga os passos abaixo para executar o projeto localmente:

### 🪄 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [pnpm](https://pnpm.io/) (recomendado pela leveza e velocidade)
* [Git](https://git-scm.com/)

Verifique as versões com:

```bash
node -v
pnpm -v
git --version
```

### ⚙️ Passo a passo

#### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/siae-web.git
cd siae-web
```

#### 2️⃣ Instalar as dependências

```bash
pnpm install
pnpm add react-icons
```

#### 3️⃣ Executar o servidor de desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em:

👉 **http://localhost:5173**

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** — isso significa que você pode usar, copiar, modificar e distribuir este código livremente, desde que mantenha o aviso de direitos autorais e a licença original.

---

Desenvolvido com 💙 pela **Equipe SIAE - LUDI**, unindo tecnologia e propósito para aprimorar a experiência estudantil na UFC Russas.
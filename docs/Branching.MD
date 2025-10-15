# 🌿 Estrutura de Branches — SIAE Web

Este documento descreve o fluxo de versionamento e a organização das branches utilizadas no repositório **SIAE Web**.

O objetivo é manter o desenvolvimento **organizado, rastreável e previsível**, permitindo a colaboração e integração contínua entre diferentes etapas do projeto.

---

## 🧭 Branches principais

| Branch | Descrição |
|--------|------------|
| **main** | Contém o código em produção (versão estável). Deploys na Vercel partem desta branch. |
| **develop** | Branch principal de desenvolvimento. Aqui são integradas as features antes de irem para `main`. |

---

## 🌱 Branches secundárias

| Tipo | Convenção de nome | Uso |
|------|--------------------|-----|
| **feature/** | `feature/nome-da-funcionalidade` | Novas funcionalidades (ex.: `feature/tela-login`). |
| **fix/** | `fix/correção-bug` | Correções de bugs ou ajustes pontuais. |
| **hotfix/** | `hotfix/nome-do-hotfix` | Correções urgentes que precisam ir direto para `main`. |
| **docs/** | `docs/atualizacao-readme` | Atualizações em documentação. |
| **refactor/** | `refactor/nome-refatoracao` | Refatorações de código sem alterar comportamento. |

---

## 🧭 Fluxo de Desenvolvimento

Siga o fluxo abaixo para contribuir com o projeto de forma organizada:

1. **Crie uma nova branch a partir de `develop`:**

   ```bash
   git checkout develop
   git pull
   git checkout -b feature/nome-da-feature

2. **Faça commits incrementais e descritivos:**

git commit -m "feat: adiciona tela de login"

3. **Ao concluir, abra um Pull Request para `develop`.**

4. **Após revisar e testar, o código é mesclado em `develop`.**

5. **Quando houver uma versão estável, `develop` é mesclado em `main`.**

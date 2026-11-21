# Guia de implantação em produção — SIAE Frontend

Este documento descreve os procedimentos de preparação, implantação, atualização e verificação do frontend do Sistema Integrado de Assistência Estudantil (SIAE) em ambiente de produção utilizando Docker, Docker Compose e Nginx.

O frontend é uma aplicação React compilada com Vite e servida pelo Nginx. A API é executada separadamente e deve estar disponível por meio de um endereço HTTPS acessível pelo navegador dos usuários.

O Compose de produção inicia somente o frontend. Ele não cria nem inicia a API, o banco de dados ou o proxy reverso responsável pelo HTTPS público.

---

## 1. Pré-requisitos

Antes da implantação, disponibilize:

- Git;
- Docker Engine;
- Docker Compose;
- Acesso ao repositório do frontend;
- Uma API SIAE implantada e acessível por HTTPS;
- Um domínio ou subdomínio destinado ao frontend;
- Um domínio ou subdomínio destinado à API;
- Uma infraestrutura de proxy reverso ou balanceador com certificado TLS;
- Acesso administrativo ao servidor de implantação.

Confira as instalações:

```bash
git --version
docker --version
docker compose version
```

O processo de construção da imagem utiliza Node.js 22 e pnpm 12.3.4. Essas ferramentas são instaladas na própria etapa de build do Dockerfile, portanto não precisam estar instaladas no host para a implantação por Docker.

## **2. Arquitetura da implantação**

A imagem de produção utiliza duas etapas:

1. **Build:** utiliza Node.js 22 Alpine e pnpm 12.3.4 para instalar as dependências e compilar a aplicação com Vite.
2. **Execução:** utiliza Nginx Alpine para servir os arquivos estáticos gerados na compilação.

O fluxo de comunicação é:

```
Navegador do usuário
        |
        | HTTPS — acesso ao frontend
        v
Proxy reverso / balanceador TLS
        |
        | HTTP interno
        v
Frontend — Nginx (porta 80)


Navegador do usuário
        |
        | HTTPS — requisições da aplicação
        v
API SIAE
        |
        v
Banco de dados
```

A API e o banco de dados possuem implantação e gerenciamento próprios.

O arquivo `docker-compose.prod.yml` publica a porta 80 do container na porta 8080 do host:

| Configuração                | Valor                 |
| --------------------------- | --------------------- |
| Serviço Compose             | `frontend`            |
| Container                   | `siae-web-production` |
| Imagem                      | `siae-web:production` |
| Porta interna               | `80`                  |
| Porta publicada no host     | `8080`                |
| Política de reinicialização | `unless-stopped`      |
| Servidor HTTP               | Nginx                 |

O Compose não configura DNS, HTTPS, certificados, firewall ou proxy reverso. Esses componentes devem ser disponibilizados pela infraestrutura de produção.

## **3. Preparar o projeto**

Clone o repositório e entre no diretório:

```
git clone https://github.com/devsiae-ludi/siae-web.git
cd siae-web
```

Confira se os arquivos necessários estão presentes:

```
ls -la
```

Entre os arquivos relevantes estão:

- `Dockerfile`;
- `docker-compose.prod.yml`;
- `.env.prod.example`;
- `nginx.conf`;
- `docker/40-runtime-config.sh`;
- `docker/runtime-config.js.template`.

## **4. Configurar as variáveis de ambiente**

Crie o arquivo de ambiente de produção a partir do exemplo:

```
cp .env.prod.example .env.prod
```

Edite o arquivo:

```
nano .env.prod
```

Configure a variável:

| Variável  | Finalidade                                          |
| --------- | --------------------------------------------------- |
| `API_URL` | Endereço HTTPS da API SIAE utilizado pelo frontend. |

Exemplo:

```
API_URL=https://api.dominio.com
```

Substitua o endereço de exemplo pelo domínio real da API.

### **4.1. Requisitos da URL da API**

O script de inicialização valida a variável `API_URL` antes de gerar a configuração de runtime.

A URL precisa:

- Utilizar o protocolo `https://`;
- Possuir um hostname válido;
- Utilizar uma porta válida, caso ela seja informada;
- Não conter espaços ou caracteres incompatíveis com a validação implementada.

URLs HTTP, valores ausentes ou inválidos fazem o script interromper a inicialização do container.

Restrinja as permissões do arquivo:

```
chmod 600 .env.prod
```

O arquivo contém a configuração do ambiente de produção. Não o versione nem compartilhe credenciais ou configurações privadas.

## **5. Entender a configuração de runtime**

O frontend utiliza mecanismos diferentes para obter o endereço da API nos ambientes de desenvolvimento e produção.

### **Desenvolvimento**

Durante o desenvolvimento, a aplicação utiliza:

```
VITE_API_URL=http://localhost:3000
```

Essa variável é lida pelo Vite durante a execução do ambiente de desenvolvimento.

### **Produção**

Em produção, a aplicação utiliza `window.__SIAE_CONFIG__.API_URL`.

O arquivo `index.html` carrega `/config.js` antes da aplicação:

```
<script src="/config.js"></script>
```

Durante a inicialização do container, o script `docker/40-runtime-config.sh`:

1. Verifica se `API_URL` foi informada;
2. Valida o formato da URL;
3. Verifica a existência do template;
4. Gera `/usr/share/nginx/html/config.js`;
5. Aplica permissões de leitura ao arquivo gerado.

O arquivo gerado contém a configuração disponibilizada ao navegador:

```
window.__SIAE_CONFIG__ = Object.freeze({
  API_URL: "https://api.dominio.com"
});
```

Essa estratégia permite alterar o endereço da API sem reconstruir a imagem do frontend. Basta atualizar a variável no arquivo `.env.prod` e recriar o container.

A configuração é pública, pois fica disponível no navegador dos usuários. Nunca coloque senhas, tokens privados ou credenciais nessa variável.

## **6. Construir a imagem de produção**

Na raiz do projeto, execute:

```
docker compose -f docker-compose.prod.yml build
```

O processo instala as dependências, executa a compilação do Vite e copia os arquivos gerados para a imagem final do Nginx.

A imagem resultante será identificada como:

```
siae-web:production
```

## **7. Iniciar o frontend**

Depois de configurar o ambiente e construir a imagem, inicie o serviço:

```
docker compose -f docker-compose.prod.yml up -d
```

Confira o estado do container:

```
docker compose -f docker-compose.prod.yml ps
```

O frontend ficará disponível no host pela porta 8080:

```
http://localhost:8080
```

Esse endereço é destinado à verificação local no servidor. Para disponibilização pública, configure o domínio e o proxy reverso com HTTPS.

## **8. Configurar domínio e HTTPS**

O Nginx do container atende requisições HTTP na porta 80. O Compose publica essa porta na porta 8080 do host.

Para disponibilizar o frontend publicamente:

1. Configure o DNS do domínio para apontar para o servidor ou balanceador;
2. Disponibilize um proxy reverso ou balanceador que aceite conexões HTTPS;
3. Configure um certificado TLS válido;
4. Encaminhe as requisições do domínio para a porta 8080 do host;
5. Restrinja o acesso direto à porta 8080, permitindo somente as origens necessárias da infraestrutura;
6. Confirme que a API também está disponível por HTTPS.

O proxy reverso e os certificados não são criados automaticamente pelo Docker Compose do frontend.

A configuração específica depende da infraestrutura utilizada e deve ser realizada conforme o ambiente de hospedagem.

## **9. Verificar a implantação**

Confira o estado do serviço:

```
docker compose -f docker-compose.prod.yml ps
```

Consulte os logs:

```
docker compose -f docker-compose.prod.yml logs --tail=100 frontend
```

Verifique a resposta HTTP do frontend no próprio servidor:

```
curl -I http://localhost:8080
```

A resposta esperada é HTTP 200.

Verifique também a configuração de runtime:

```
curl -i http://localhost:8080/config.js
```

O arquivo deve apresentar a variável `API_URL` configurada para a API de produção.

Confirme que o endereço público do frontend responde por HTTPS:

```
curl -I https://frontend.dominio.com
```

Substitua o domínio de exemplo pelo endereço real.

Por fim, acesse o sistema pelo navegador e valide:

- Carregamento da página inicial;
- Carregamento dos arquivos estáticos;
- Comunicação com a API;
- Autenticação;
- Redirecionamento conforme o perfil do usuário;
- Navegação entre as páginas;
- Operações principais do sistema.

A disponibilidade da página inicial, isoladamente, não comprova que a integração com a API esteja funcionando.

## **10. Atualizar uma implantação existente**

Antes de atualizar o frontend:

1. Avalie as alterações da nova versão;
2. Confirme a compatibilidade com a API em execução;
3. Faça a atualização do código;
4. Confira as alterações de configuração;
5. Construa a nova imagem;
6. Recrie o container;
7. Verifique o funcionamento da aplicação.

Atualize o código:

Antes de atualizar, confirme que não existem alterações locais pendentes que precisem ser preservadas. A implantação padrão deste projeto utiliza a branch `main`, que deve receber somente alterações previamente integradas e aprovadas.
```
git fetch origin
git switch main
git pull --ff-only origin main
```

O parâmetro `--ff-only` impede que o Git crie um merge automático durante a atualização. Se não for possível avançar a branch diretamente, interrompa o procedimento e investigue a divergência antes de continuar.

Se a implantação utilizar uma versão específica ou outra estratégia de publicação formalmente definida, siga o procedimento correspondente.

Construa a nova imagem:

```
docker compose -f docker-compose.prod.yml build
```

Recrie o container:

```
docker compose -f docker-compose.prod.yml up -d --force-recreate
```

Confira o estado e os logs:

```
docker compose -f docker-compose.prod.yml ps
```

```
docker compose -f docker-compose.prod.yml logs --tail=100 frontend
```

Se apenas o endereço da API tiver mudado, atualize `API_URL` no `.env.prod` e recrie o container. Não é necessário reconstruir a imagem somente por essa alteração.

Depois de qualquer atualização, valide a página, a configuração de runtime e a comunicação com a API.

## **11. Gerenciar os containers**

Para visualizar o serviço:

```
docker compose -f docker-compose.prod.yml ps
```

Para acompanhar os logs em tempo real:

```
docker compose -f docker-compose.prod.yml logs -f frontend
```

Para interromper o serviço:

```
docker compose -f docker-compose.prod.yml down
```

Para iniciá-lo novamente:

```
docker compose -f docker-compose.prod.yml up -d
```

O comando `down` remove o container e a rede gerenciada pelo Compose, mas não deve ser confundido com procedimentos de remoção de imagens ou dados de outros serviços.

## **12. Nginx, cache e cabeçalhos de segurança**

A configuração `nginx.conf` inclui:

- Redirecionamento interno das rotas da aplicação React para `index.html`;
- Compressão Gzip;
- Cabeçalhos de segurança;
- Política de Content Security Policy;
- Desativação do armazenamento em cache de `index.html`;
- Desativação do armazenamento em cache de `/config.js`;
- Cache de um ano para arquivos gerados em `/assets/`;
- Cache de sete dias para determinados arquivos públicos de imagem.

A configuração de runtime não deve ser armazenada em cache pelo navegador, pois contém o endereço da API utilizado pela aplicação.

Os arquivos com nomes versionados gerados pelo Vite podem utilizar cache prolongado, pois são referenciados pela versão correspondente do HTML.

Ao modificar a política de segurança de conteúdo, avalie os recursos efetivamente utilizados pelo frontend e valide os fluxos da aplicação. Não amplie permissões indiscriminadamente.

## **13. Solução de problemas**

### **Container não inicia**

Consulte os logs:

```
docker compose -f docker-compose.prod.yml logs --tail=100 frontend
```

Verifique se:

- O Docker está funcionando;
- O arquivo `.env.prod` existe;
- A variável `API_URL` está configurada;
- A URL utiliza HTTPS;
- O template de runtime foi incluído na imagem.

### **Erro de configuração da API**

Se aparecer:

```
ERRO: a variável API_URL é obrigatória.
```

Verifique o arquivo `.env.prod` e confirme se a variável foi informada corretamente.

Se aparecer:

```
ERRO: API_URL inválida. Informe uma URL HTTPS válida.
```

Confira o protocolo, hostname, porta e formato do endereço configurado.

### **Frontend abre, mas não se comunica com a API**

Verifique:

1. Se a API está disponível;
2. Se `API_URL` aponta para o domínio correto;
3. Se o certificado HTTPS da API é válido;
4. Se a API permite a origem do frontend por meio de CORS;
5. Se as requisições estão sendo bloqueadas pela política de segurança do navegador;
6. Se o endereço `/config.js` apresenta a configuração esperada.

A API precisa aceitar a origem pública real do frontend. A configuração CORS é responsabilidade da API.

### **Rotas internas apresentam erro 404**

Confira se o Nginx está utilizando o arquivo `nginx.conf` fornecido pelo projeto e se a regra de fallback para `index.html` está ativa.

### **Alteração da URL da API não foi aplicada**

Depois de editar `.env.prod`, recrie o container:

```
docker compose -f docker-compose.prod.yml up -d --force-recreate
```

Em seguida, consulte `/config.js` para confirmar o valor aplicado.

## **14. Cuidados operacionais e de segurança**

- Não versione `.env.prod`.
- Não exponha credenciais ou informações privadas no frontend.
- Não utilize URLs HTTP para a API de produção.
- Mantenha o certificado HTTPS válido e renovado.
- Restrinja o acesso externo à porta 8080 conforme a arquitetura de rede.
- Mantenha Docker, Nginx e imagens-base atualizados.
- Configure monitoramento e acompanhamento dos logs.
- Valide as políticas CORS da API.
- Não considere a configuração de runtime um mecanismo para armazenar segredos.
- Faça a atualização do frontend de forma coordenada com a API.
- Teste os fluxos essenciais após cada atualização.
- Não remova containers, imagens ou recursos de infraestrutura sem avaliar o impacto e o procedimento de recuperação.

## **15. Pendências antes da implantação pública**

A existência dos arquivos Docker e da configuração de produção não significa, por si só, que toda a infraestrutura esteja pronta para disponibilizar o sistema publicamente.

Antes da publicação, confira:

1. **Domínio do frontend:** configure o DNS e o acesso HTTPS.
2. **API:** confirme que o domínio da API está disponível por HTTPS.
3. **CORS:** configure a API para aceitar a origem pública real do frontend.
4. **Recuperação de senha:** confirme que os links enviados por e-mail apontam para o domínio real do frontend, e não para `localhost`.
5. **Autenticação:** valide login, logout, sessão e redirecionamento conforme os perfis de usuário.
6. **Integração:** valide os formulários e as operações que dependem da API.
7. **Infraestrutura:** configure proxy reverso, certificados, firewall, DNS e monitoramento.
8. **Atualização:** estabeleça um procedimento controlado de publicação e recuperação de versões.

A implantação pública deve ocorrer somente depois da validação integrada do frontend e da API, com os domínios e serviços de produção devidamente configurados.

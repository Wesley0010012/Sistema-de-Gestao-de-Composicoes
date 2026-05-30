# Testes E2E do App Web

Esta suíte automatiza fluxos do app web React. Ela não cobre o PWA mobile/Expo nem o comportamento específico de WebView.

## Pré-requisitos

1. Subir a aplicação completa:

```bash
docker compose up -d --build
```

2. Instalar dependências do frontend:

```bash
cd Frontend
npm ci
npx playwright install chromium
```

## Executar

```bash
npm run test:e2e
```

Os testes rodam com um worker (`--workers=1`) porque os fluxos E2E fazem CRUD contra a mesma base de dados.

Para testar outra URL:

```bash
E2E_BASE_URL=http://localhost:8081 npm run test:e2e
```

Para depuração visual:

```bash
npm run test:e2e:headed
```

Esse comando roda com `E2E_SLOW_MO=500`, deixando as ações mais lentas para acompanhar a execução no navegador. Para mudar a velocidade:

```bash
E2E_SLOW_MO=1000 npm run test:e2e:headed
```

## Organização

- `01-musicos.spec.ts`: MÚSICOS.
- `02-admin.spec.ts`: ADMIN.
- `03-compositores-listagem.spec.ts`: COMPOSITORES LISTAGEM.
- `04-compositores-crud.spec.ts`: COMPOSITORES CRUD.
- `05-obras-listagem.spec.ts`: OBRAS LISTAGEM.
- `06-obras-crud.spec.ts`: OBRAS CRUD.
- `support/app-web.ts`: helpers compartilhados.
- `fixtures/score.pdf`: PDF mínimo usado em uploads.

## Cobertura

### MÚSICOS

- Renderização da página pública de partituras.
- Validação de ausência de botões/links de download.
- Abertura e fechamento do leitor de PDF.
- Navegação por obras completas.
- Navegação por compositores até uma obra.
- Filtros públicos por gênero e instrumento.

### ADMIN

- Redirecionamento de rotas admin sem autenticação.
- Erro com credenciais inválidas.
- Login com usuário seedado.
- Redirecionamento de `/admin` para `/admin/composers` autenticado.

### COMPOSITORES LISTAGEM

- Renderização de cards, filtros, tabela e ações.
- Busca por nome.
- Estado vazio sem resultados.
- Filtros por nacionalidade e período.
- Navegação pelo botão `Novo compositor`.

### COMPOSITORES CRUD

- Cadastro com dados obrigatórios e status vivo.
- Edição de nome, nacionalidade, período e data de falecimento.
- Cancelamento de exclusão.
- Exclusão confirmada.

### OBRAS LISTAGEM

- Renderização de cards, filtros, accordion e ações.
- Busca por título.
- Estado vazio sem resultados.
- Filtros por gênero e compositor.
- Abertura do accordion e validação dos detalhes da obra.
- Navegação pelo botão `Nova obra`.

### OBRAS CRUD

- Cadastro com relações, seção, partitura e PDF.
- Busca, filtro e visualização de detalhes da obra.
- Validação de ausência de botões de download.
- Edição de dados da obra.
- Inclusão de PDF em partitura criada durante edição.
- Remoção de partitura e seção durante edição.
- Cancelamento e confirmação de exclusão.

# Sistema-de-Gestão-de-Composições

Projeto - Sistema de Gestão de Composições - Programação WEB

## Docker com Postgres, Backend e Frontend

O ambiente Docker expõe a aplicação inteira por uma única porta Nginx:

- Frontend React: `http://localhost:8080/`
- Backend Laravel API: `http://localhost:8080/api`
- Arquivos públicos do Laravel: `http://localhost:8080/storage/...`
- Postgres persistente em volume Docker `postgres_data`

### Subir o ambiente

```bash
docker compose up --build
```

Na primeira execução, o container do backend:

1. espera o Postgres ficar disponível;
2. executa `php artisan migrate --force`;
3. executa `php artisan db:seed --force`;
4. cria o marcador `storage/app/.docker_seeded` para não duplicar seeds nos próximos boots.

Se o volume de storage for recriado ou ficar sem PDFs, o boot regenera apenas as partituras seedadas com `DefaultScores`.

Usuário admin seedado:

```text
email: test@example.com
senha: password
```

### Porta do Nginx

Por padrão a porta externa é `8080`. Para alterar:

```bash
NGINX_PORT=8081 docker compose up --build
```

Em produção, informe uma chave própria do Laravel em vez da chave padrão de desenvolvimento:

```bash
APP_KEY=base64:sua-chave-aqui docker compose up --build
```

### Resetar banco e seeds

Para apagar o Postgres persistido e rodar tudo do zero:

```bash
docker compose down -v
docker compose up --build
```

Isso remove também o volume de storage usado pelo backend, então PDFs seedados serão recriados.

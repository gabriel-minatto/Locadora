# LOCADORA

**Requisitos:**

- Docker/Docker-compose instalados

**Inicialização:**

`cd docker`

`docker-compose up`

O banco será automaticamente populado com as tabelas através do arquivo SQL na pasta 'docker/sql'

**Documentação**

`docker exec locadora npm run apidocs`

Após isso a documentação estará na pasta 'docs', basta abrir o arquivos 'index.html' no navegador.
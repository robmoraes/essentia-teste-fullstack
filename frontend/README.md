# essentia-teste-fulltack Frontend
Projeto de frontend para processo de seleção da empresa Essentia

## Requisitos

- Quasar 1.15
- Node >=10
- NPM >=5

A instalação do quasar pode ser guiada no seguinte link (atenção as recomendações sobre Node e NPM):

- [https://quasar.dev/quasar-cli/installation](https://quasar.dev/quasar-cli/installation)

## Download do projeto

```bash
$ git clone https://github.com/robmoraes/essentia-teste-fullstack.git
```

## Instalação das dependências

Acessar a pasta /frontend:

```bash
cd /pasta/do/projeto/frontend
npm install
```

Após instalar, algumas alterações no arquivo "/quasar.conf.js" podem ser necessárias:

```js
build: {
      env: {
        API: ctx.dev
          ? 'http://localhost:8000/api' // Informar URL da API
          : 'http://localhost:8000/api' // Seria a URL da API de produção
      },

// Caso a aplicação frontend deva rodar na rede,
// deve ser configurado devServer:
devServer: {
      https: false,
      host: '10.0.0.190', // ip para acesso na rede
      port: 8080,         // porta -- o acesso ficará http://10.0.0.190:8080 por exemplo
      open: true // opens browser window automatically
    },

```

### Rodar a aplicação no modo de Desenvolvimento (hot-code reloading, error reporting, etc.)

Depois de instalado com npm, e configurado o arquivo "quasar.conf.js", a aplicação pode ser executada com o comando abaixo:

```bash
cd /pasta/do/projeto/frontend
quasar dev
```

E já pode ser acessado pela URL configurada que é exibida após a conclusão do comando quasar dev.

As credênciais de acesso podem ser obtidas após a instalação da aplicação backend.

## Degustação

Mas como o processo de instalação é relativamente longo, preparei um ambiente de degustação para que possam avaliar. Para isso, publiquei o build do frontend na estrutura de views do laravel e fiz um pequeno ajuste nas rotas do laravel (/routes/web.php) para resolver as uris do front. Sendo assim a API e o Front rodam sob mesmo domínio, mas a construção foi completamente desacoplada.

- [Playground do desafio](https://essentia.seemann.com.br)

Lembrando:

- e-mail: teste@essentia.com.br
- senha: 12345678

### Build da aplicação para produção

```bash
quasar build
```

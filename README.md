<h1 align="center">
  <img alt="GYMPOINT" title="GYMPOINT" src=".github/logo.png" width="200px" />
</h1>

<blockquote align="center">“App gerenciador de academia”</blockquote>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

Durante esse desafio, foi necessário criar a aplicação ao todo (api, web e mobile), utilizando diversas ferramentas utilizadas atualmente no mercado de trabalho.

### Ferramentas utilizadas

`API`:

- NodeJS;
- Express;
- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (PostgreSQL);

`WEB`:

- React;
- Redux;
- Saga;
- Hooks;
- Reactotron;
- Styled Components;
- ESLint + Prettier + EditorConfig;

`MOBILE`:

- React Native;
- Redux;
- Saga;
- Hooks;
- Reactotron;
- Styled Components;
- ESLint + Prettier + EditorConfig;

## :hammer: Instalação

clone o projeto rodando o comando:

```
git clone https://github.com/alanunesouza/gympoint.git
```

prossiga com as instrucoes abaixo:

### 1. API

Instale o [docker](https://docs.docker.com/install/), em seguida vamos criar os dockers com o seguinte comando:

```
docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine &&  docker run --name gympoint -e POSTGRESS_PASSWORD=docker -p 5432:5432 -d postgres && docker run --name mongogympoint -p 27017:27017 -d -t mongo
```

Instale o [postbird](https://electronjs.org/apps/postbird) (interface de acesso ao banco postgres). Após instalado, execute e configure a conexão ao banco (HOST localhost, PORT 5432, USERNAME postgres, PASSWORD docker) e clique em "connect". Assim que conectar, crie um banco de dados chamado "gympoint"

Se seguiu os passos anteriores corretamente, agora estamos com tudo pronto para rodar a API. Rode os comando abaixo em seu terminal:

```
cd api && yarn install && yarn sequelize db:seed:all && yarn sequelize db:migrate && yarn dev
```
Prontinho, sua API já está rodando.

### 2. WEB

Abra um novo terminal e execute os comandos abaixo:

```
cd web && yarn install && yarn start
```

### 2. MOBILE

Abra um novo terminal e execute os comandos abaixo (rode de acordo com o simulador que está configurado em sua máquina - IOS ou Android):

IOS 

```
cd mobile && yarn install && react-native run-ios
```

ANDROID

```
cd mobile && yarn install && react-native run-android
```

Obs.: *Testado apenas no IOS*

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.


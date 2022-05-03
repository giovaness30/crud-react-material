# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `1 - 'yarn' to create all dependency's`

### `2 - 'yarn run json-server' execute backend server`

### `3 - 'yarn start' start project`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### json-server

http://localhost:3000

DataBase : src/data/db.json

### More About

        Produtos com seus nomes, preços e descrição

        - Projeto Criado com create-react-app, e utilizado yarn como
        gerenciador.

        - Utilizando Material UI como Biblioteca de UI junto com Data-Grid
        também do materialUI, facilitando a visualização dos dados em tabela, contendo formas de
        pesquisa e visualizações

        - json-server utilizado para facilitar CRUD sem criar um backend

        - react-router-dom para Rotas da aplicação contendo pagina notFound 404,
        em casos de rotas invalidas

        - Utilizado Redux para passar um estado atual globalmente na aplicação.

        - Utilizando useEffect para chamar a função que contem o map com a
        listagem dos itens na pagina Produtos.

        Assim quando algum dado for alterada pelo front enviamos para o redux
        uma alteração no estado, para assim atualizar a tabela com as novas informações.

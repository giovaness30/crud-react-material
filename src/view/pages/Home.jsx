import React from 'react'
import API from '../../api/api.js'

const Home = props => {
  return (
    <div className="center">
      <h1>Sistema Crud React + Material</h1>
      <h3>Produtos com seus nomes, preços e descrição</h3>
      <p>
        - Projeto Criado com create-react-app, e utilizado yarn como
        gerenciador.
      </p>
      <span>
        - json-server utilizado para facilitar CRUD sem criar um backend
      </span>
      <span>
        Precisamos rodar o comando <u>'yarn run json:server'</u> antes de{' '}
        <u>'yarn start'</u>&nbsp; para executar o backend
      </span>
      <p>
        - Utilizando Material UI como Biblioteca de UI junto com Data-Grid
        também do materialUI,
      </p>
      <span>
        facilitando a visualização dos dados em tabela, contendo formas de
        pesquisa e visualizações
      </span>
      <p>
        - react-router-dom para Rotas da aplicação contendo pagina notFound 404,
        em casos de rotas invalidas
      </p>
      <p>
        - Utilizado Redux para passar um estado atual globalmente na aplicação.
      </p>
      <span>
        - Utilizando useEffect para chamar a função que contem o map com a
        listagem dos itens na pagina Produtos.
      </span>
      <span>
        Assim quando algum dado for alterada pelo front enviamos para o redux
        uma alteração no estado
      </span>
      <span>, para assim atualizar a tabela com as novas informações.</span>
      <p>
        - react-currency-format para manter a formatação do TextField na
        inserção dos valores.
      </p>
      <p>
        - Adicionado uma página somente de pesquisa, para completar o crud.
        Podendo utilizar a pesquisa da tabela e também a da página
      </p>
    </div>
  )
}

export default Home

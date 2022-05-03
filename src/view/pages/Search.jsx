import React, { useState } from 'react'
import { TextField, MenuItem, Button } from '@mui/material'
import API from '../../api/api.js'

const Search = () => {
  const options = [
    {
      value: 'id',
      label: 'Código do produto'
    },
    {
      value: 'name',
      label: 'Nome do Produto'
    }
  ]

  const [optionSelect, setOptionSelect] = useState('id')
  const [valueSearch, setValueSearch] = useState('')
  const [resultSearch, setResultSearch] = useState('')

  function getSearch() {
    API.get(
      `/products?${optionSelect === 'name' ? 'q' : optionSelect}=${valueSearch}`
    )
      .then(response => {
        setResultSearch(
          response.data.map(item => (
            <div>
              <li key={item.id}>
                {item.id} - {item.name} - {item.description} - {item.price}
              </li>
            </div>
          ))
        )
      })
      .catch(e =>
        alert(
          'Erro backend - execute-o com o comando = yarn run json:server' + e
        )
      )
  }

  return (
    <div className="center">
      <TextField
        id="standard-select-currency"
        select
        label="Pesquisar por:"
        value={optionSelect}
        onChange={e => setOptionSelect(e.target.value)}
        helperText="Selecione o que Pesquisar"
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="searchId"
        // label="..."
        value={valueSearch}
        onChange={e => setValueSearch(e.target.value)}
      ></TextField>
      <Button onClick={getSearch}>Pesquisar</Button>
      {resultSearch}
    </div>
  )
}

export default Search

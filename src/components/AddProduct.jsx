import { useState } from 'react'
import API from '../api/api.js'
import './AddProduct.css'

import { Button, Stack } from '@mui/material'
import CurrencyFormat from 'react-currency-format'

import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Snackbar from '@mui/material/Snackbar'

const AddProduct = props => {
  const clearInputs = () =>
    setInputs({
      ...inputs,
      name: '',
      description: '',
      price: ''
    })

  const [snackError, setSnackError] = useState(false)
  const [snackSuccess, setSnackSuccess] = useState(false)

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: ''
  })

  function handleSubmit() {
    postNewCompany()
  }

  function postNewCompany() {
    var data = {
      name: inputs.name,
      description: inputs.description,
      price: inputs.price
    }

    API.post(`/products`, data)
      .then(response => {
        console.log(response)
        if (response.statusText === 'Created') {
          clearInputs()
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="addProduct">
      <h3>Incluir Produto</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          required
          id="name"
          label="Produto"
          value={inputs.name}
          type="text"
          onChange={e => setInputs({ ...inputs, name: e.target.value })}
        />
        <TextField
          required
          id="description"
          label="Descrição"
          value={inputs.description}
          onChange={e => setInputs({ ...inputs, description: e.target.value })}
        />
        <CurrencyFormat
          customInput={TextField}
          thousandSeparator
          prefix="R$"
          decimalScale={2}
          label="Preço"
          value={inputs.price}
          onChange={e => setInputs({ ...inputs, price: e.target.value })}
        />
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="flex-end"
          spacing={3}
        >
          <Button variant="contained" type="submit" endIcon={<SendIcon />}>
            Incluir
          </Button>
        </Stack>
      </form>
      <Snackbar
        open={snackError}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => {
          setSnackError(false)
        }}
      ></Snackbar>
      <Snackbar
        open={snackSuccess}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => {
          setSnackSuccess(false)
        }}
      ></Snackbar>
    </div>
  )
}

export default AddProduct

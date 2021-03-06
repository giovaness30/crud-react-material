import { useState, useEffect, useCallback } from 'react'
import CurrencyFormat from 'react-currency-format'

import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarDensitySelector,
  GridToolbarFilterButton
} from '@mui/x-data-grid'
import PropTypes from 'prop-types'
import { Grid, Box, Button, Modal, TextField } from '@mui/material'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import AddProduct from '../../components/AddProduct.jsx'
import API from '../../api/api.js'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/refreshTable.js'

// Search da tabela Data-Grid
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}
    >
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Pesquisar..."
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Limpar"
              aria-label="Limpar"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          m: theme => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider',
            color: 'green'
          }
        }}
      />
    </Box>
  )
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

const Products = () => {
  const [products, setProducts] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [prodEdit, setProdEdit] = useState(0)

  const refresh = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: ''
  })

  // FUNCAO PRINCIPAL ONDE FAZ A LISTAGEM DOS DADOS
  useEffect(() => {
    API.get(`/products`)
      .then(res =>
        setProducts(
          res.data.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price
          }))
        )
      )
      .catch(e =>
        alert(
          'Erro backend - execute-o com o comando = yarn run json:server. ->' +
            e
        )
      )
  }, [refresh])

  const [searchText, setSearchText] = useState('')
  const [rows, setRows] = useState(products)

  const requestSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = products.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field])
      })
    })
    setRows(filteredRows)
  }

  useEffect(() => {
    setRows(products)
  }, [products])

  const columns = [
    { field: 'id', headerName: 'C??digo', width: 90 },
    {
      field: 'name',
      headerName: 'Produto',
      width: 200
    },
    {
      field: 'description',
      headerName: 'Descri????o',
      width: 250
    },
    {
      field: 'price',
      headerName: 'Pre??o'
    },
    {
      field: 'actions',
      headerName: 'A????es',
      type: 'actions',
      getActions: params => [
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          onClick={deletItem(params)}
          label="pre??os"
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={editProduct(params.row)}
          label="pre??os"
        />
      ]
    }
  ]

  // DELETE ITENS
  const deletItem = useCallback(
    params => () => {
      API.delete(`/products/${params.row.id}`)
        .then(res => {
          dispatch(increment())
        })
        .catch(e =>
          alert(
            'Erro backend - execute-o com o comando = yarn run json:server. ->' +
              e
          )
        )
    },
    []
  )

  // EDIT ITEM
  const editProduct = useCallback(params => () => {
    setInputs({
      ...inputs,
      name: params.name,
      description: params.description,
      price: params.price
    })
    setProdEdit(params.id)
    handleOpen()
  })

  const saveProduct = useCallback(() => {
    const data = {
      name: inputs.name,
      description: inputs.description,
      price: inputs.price
    }
    API.put(`/products/${prodEdit}`, data)
      .then(res => {
        dispatch(decrement())
        handleClose()
      })
      .catch(e =>
        alert(
          'Erro backend - execute-o com o comando = yarn run json:server. ->' +
            e
        )
      )
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }

  const handleOpen = () => {
    setOpenEdit(true)
  }

  const handleClose = () => {
    setOpenEdit(false)
  }

  return (
    <div className="center">
      <div style={{ height: '73vh', width: '1200px' }}>
        <div className="center">
          <AddProduct />
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={false}
          pageSize={8}
          rowsPerPageOptions={[8]}
          disableSelectionOnClick
          components={{ Toolbar: QuickSearchToolbar }}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: event => requestSearch(event.target.value),
              clearSearch: () => requestSearch('')
            }
          }}
        />
      </div>
      {/* MODAL DE EDICAO PRODUTO */}
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={1}>
            <Grid item>
              <TextField
                id="name"
                label="Nome"
                value={inputs.name}
                onChange={e => setInputs({ ...inputs, name: e.target.value })}
              />
            </Grid>
            <Grid item>
              <TextField
                id="description"
                label="Descri????o"
                value={inputs.description}
                onChange={e =>
                  setInputs({ ...inputs, description: e.target.value })
                }
              />
            </Grid>
            <Grid item>
              <CurrencyFormat
                customInput={TextField}
                thousandSeparator
                prefix="R$"
                decimalScale={2}
                label="Pre??o"
                value={inputs.price}
                onChange={e => setInputs({ ...inputs, price: e.target.value })}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClose}>
                <CloseIcon />
              </Button>
              <Button variant="contained" onClick={saveProduct}>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default Products

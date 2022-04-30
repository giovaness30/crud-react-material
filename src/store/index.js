import { configureStore } from '@reduxjs/toolkit'
import refreshTable from './refreshTable'

export default configureStore({
  reducer: {
    counter: refreshTable
  }
})

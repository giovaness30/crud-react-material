import axios from 'axios'

export default axios.create({
  baseURL: `https://my-json-server.typicode.com/giovaness30/myjsonserver/`,
  headers: {
    'Content-Type': 'application/json'
  }
})

import axios from 'axios'

export default function request (config) {
  const req = axios.create({
    baseURL: 'http://202.199.6.45:8080',
    timeout: 15000
  })
  return req(config)
}

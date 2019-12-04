import axios from 'axios'

export default ({ app, env }, inject) => {
  const localAxios = axios.create({
    baseURL: env.backendUrl,
    timeout: 1000,
    withCredentials: true
  })
  return inject('axios', localAxios)
}

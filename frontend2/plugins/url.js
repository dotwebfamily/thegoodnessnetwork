export default ({ app, env }, inject) => {
  const url = env.backendUrl
  return inject('url', url)
}

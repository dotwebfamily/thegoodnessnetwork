export default ({ app, env }, inject) => {
  // const url = 'https://proyecto-integrador-red-social.appspot.com'
  const url = 'http://localhost:4000'
  return inject('url', url)
}

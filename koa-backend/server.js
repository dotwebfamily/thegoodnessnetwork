const Koa = require('koa')
const Cors = require('koa-cors')
const Sessions = require('koa-session')
exports.createServer =  async function ({ port, cors = true, sessions = true }) {
  const app = new Koa()
  cors ? app.use(Cors) : null
  sessions ? app.use(Sessions({},app)) : null
  app.listen(port)
  return app
}

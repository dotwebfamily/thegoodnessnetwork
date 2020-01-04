const PORT = process.env.PORT || 4000;
(async () =>{
  const { createServer } = require('./server')
  createServer({
    port: PORT
  })
})()

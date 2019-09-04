const config = require('./app/config');
const app = require('./app/server')(config)
app.on('serverReady',function(){
    console.log('server initialized succesfully');
});

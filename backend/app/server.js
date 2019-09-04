const debug = require('debug')
// Create server with config function
module.exports = function(config){
    // create express server
    const app = createExpressServer(config);
    const events = [
        'httpStarted',
        'mongoConnected',
        'redisSessionConnected'
    ];
    serverReady(app,events);

    // set redis for sessions
    setRedisSessions(app,config);

    // set mongo connection pool
    setMongoPool(app,config);

    app.on('serverReady',function(){
        // set routes
        setRoutes(app,config)
    })

    // add json schema validator
    setValidate(app,config);

    // return app
    return app;
}


function createExpressServer(config){
    const express = require('express');
    // escuchamos el http y avisaremos que se inicializo correctamente
    var cors = require('cors');
    const app =  express();
    const corsOptions = {
       origin:true,
       credentials: true
    };
    app.options('*', cors(corsOptions));
    app.use(cors(corsOptions));
    // parsear jsons en el body
    const bodyParser = require('body-parser')
    app.use(bodyParser.json());
    const server = app.listen(config.port, () =>{
        debug('createExpressServer')(`Server listening on port ${config.port}!`)
        app.emit( "httpStarted", "httpStarted" )
    });
    app.set('server',server);
    // route to check if server works
    app.get('/', (req, res) => res.send('Up'));
    return app;
}

function setRedisSessions(app,config){
    const redis = config.redis;
    const expressSession = require('express-session');
    const ConnectRedis = require('connect-redis')(expressSession);
    const redisOptions = config.redisOptions;

    // creamos el cliente de redis
    const redisClient = redis.createClient(redisOptions);
    redisClient.on('ready', () => {
        app.emit('redisSessionConnected','redisSessionConnected')
    });
    redisClient.on('error', (err) => {
      debug('Redis error: ', err);
    });

    // ponemos la session de redis
    const redisSessionStore = new ConnectRedis({
        client:redisClient
    });
    app.use(
        expressSession({
            store:redisSessionStore,
            secret: config.secret,
            resave:true,
            saveUninitialized:false,
            secure:true
        })
    );
    app.set('redisSessionStore',redisSessionStore);
}

function setMongoPool(app,config){
    // set mongoDB connection
    const MongoClient = config.mongodb.MongoClient;
    const client = MongoClient.connect(config.mongoUrl,{
        poolSize:20
    }).then((client)=>{
        app.set('mongoClient',client);
        app.set('mongodb',client.db(config.mongoDatabase));
        app.emit('mongoConnected','mongoConnected');
    });
}

function setValidate(app,config){
    // function to validate jsonSchemas
    const validate = require("./validate")

    // set socket io for use in any part of the app 
    app.set('validate',validate);
}

function setRoutes(app,config){
    // rutas donde se pasa el app para extenderlo
    const rutasCompras = require('./rutas/compras')(app);
    const rutasVentas = require('./rutas/ventas')(app);
    const rutasInventario = require('./rutas/inventario')(app);
    const rutasGastos = require('./rutas/gastos')(app);
    const rutasReportes = require('./rutas/reportes')(app);
    const rutasUsuarios = require('./rutas/usuarios')(app);
    const rutasProductos = require('./rutas/productos')(app);
    const rutasPrecios = require('./rutas/precios')(app);
}
function serverReady(app,events){
   let eventNum = events.length;
   events.forEach((event)=>{
       app.on(event,checkIfReady.bind(this)); 
   })
   function checkIfReady(ev){
       debug(ev,eventNum);
       eventNum -=1; 
       if(eventNum==0){
           app.emit('serverReady'); 
       }
   }
}

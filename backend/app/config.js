module.exports = {
    port:8080,
    secret:'es un secreto',
    redisOptions : {
        host:"redis-13579.c99.us-east-1-4.ec2.cloud.redislabs.com",
        port:13579,
        no_ready_check:true,
        auth_pass:"kDsHvLWvxNSZ6LMXcqcHsdIaY3xPWL8y" 
    },
    mongoUrl:"mongodb+srv://redsocial:RedSocial1@cluster0-umels.gcp.mongodb.net/test?retryWrites=true&w=majority",
    redis:require('redis'),
    mongodb:require('mongodb'),
    mongoDatabase:'redSocial'
}


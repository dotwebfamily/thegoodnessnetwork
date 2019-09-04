module.exports = {
    port:8080,
    secret:'es un secreto',
    redisOptions : {
        host:"redis-15762.c124.us-central1-1.gce.cloud.redislabs.com",
        port:15762,
        no_ready_check:true,
        auth_pass:"Zd7YkkJQ1chSqCzmtWPfqwboOo70hQ9t" 
    },
    mongoUrl:"mongodb+srv://barmoverde:Barmoverde1@cluster0-bjlax.gcp.mongodb.net/test?retryWrites=true&w=majority",
    redis:require('redis'),
    mongodb:require('mongodb'),
    mongoDatabase:'barmoverde'
}


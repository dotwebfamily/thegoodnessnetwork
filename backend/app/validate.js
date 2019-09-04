const debug = require('debug')('app/validate')
// json schema validator
const Validator = require('jsonschema').Validator;
const referencias = require('./validaciones/referencias'); 
const v = new Validator();
referencias.forEach(function(schema){
   v.addSchema(schema,schema.id); 
});

// validate function
module.exports = function(data,validacion,socket,canBeNull=false){
    if(data==null && !canBeNull){ 
        if(socket){
            debug("data is empty");
            socket.emit("validationError",[{"property":"data","message":" is empty"}]);
        }
        return false;
    }
    const validation = v.validate(data,validacion);
    if(validation.valid){
        debug("valid");
        return true;
    }
    debug(validation.errors.map((x)=>x.message));
    if(socket){
        debug(validation.errors);
        socket.emit("validationError",validation.errors);
    }
    return false;
};

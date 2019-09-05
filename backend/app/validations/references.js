// exports.module = [pago,fecha,email,estadoCompra];
const pago = {
    "id": "/pago",
     "type":"object",
     "properties":{
         "ref":{"type":"string"},
         "info":{"type":"string"},
         "fecha":{"type":"string"}
      },
      "required":["ref","fecha"],
      "additionalProperties": false
}
const fecha = {
    "id":"/fecha",
    "type":"string",
    "format":"date"
}
const email = {
    "id":"/email",
    "type":"string",
    "format":"email"
}
const estadoCompra = {
    "id":"/estadoCompra",
    "type":"string",
    "enum":["pendiente","aprobada","rechazada","enviada","devuelta"]
}

module.exports = [pago,fecha,email,estadoCompra];

const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const RequestSchema = new Schema({
    nome_cliente: {
        type: String,
        required: true
    },
    codigo_cliente: {
        type: Number,
        default: null
    },
    url: {
        type: String,
        required: true
    },
    metodo: {
        type: String,
        required: true
    },
    payload: {
        type: Object,
        default: null
    }
})

module.exports = mongosee.model('request', RequestSchema);
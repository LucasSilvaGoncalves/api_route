const express = require('express');
const axios = require('axios');
const router = express.Router();

Methods = [
    'GET',
    'POST',
    'PUT',
    'DELETE'
];

router.post('/route', async (req, res) => {

    let method = Methods.find(e => e == req.body.method);
    let path = req.body.path;

    if(!method){
        res.status(400).json({error: "metodo não encontrado!"});    
    }

    if(!path){
        res.status(400).json({error: "URL não encontrado!"});    
    }

    // Apaga os indices: prioridade & fila do Body.
    let body = Object.assign({}, req.body);
    delete body.method;
    delete body.path;

    switch(method){
        case 'GET':
            console.log('entrou');
            result = GETfunction(path, body);
        break;
        case 'POST':
            result = POSTfunction(path, body);
        break;
        case 'PUT':
            result = PUTfunction(path, body);
        break;
        case 'DELETE':
            result = DELETEfunction(path, body);
        break;
    };

    res.status(200).json(result);

});

// GET
function GETfunction (path, body){
    
    axios.get(path, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });    
}

// POST
function POSTfunction (path, body){
    
    axios.post(path, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });    
}

// PUT
function PUTfunction (path, body){
    
    axios.put(path, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });    
}

// DELETE
function GETfunction (path, body){
    
    axios.delete(path, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });    
}


module.exports = router;
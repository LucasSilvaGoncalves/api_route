const express = require('express');
const axios = require('axios');
const router = express.Router();
const Request = require('../models/request');

Methods = [
  'get',
  'GET',
  'delete',
  'DELETE',
  'head',
  'HEAD',
  'options',
  'OPTIONS',
  'post',
  'POST',
  'put',
  'PUT',
  'patch',
  'PATCH',
  'purge',
  'PURGE',
  'link',
  'LINK',
  'unlink',
  'UNLINK'
];

router.get('/route', async (req, res) => {

  res.status(200).json({status: "API is running!", payload: req.body});

});

router.post('/route', async (req, res) => {

    let method = Methods.find(e => e == req.body.method);
    let path = req.body.path;

    if(!method){
        res.status(400).json({error: "Método não encontrado!"});    
    }

    if(!path){
        res.status(400).json({error: "URL não encontrado!"});    
    }    

    // Apaga os indices: prioridade & fila do Body.
    let body = Object.assign({}, req.body);
    delete body.method;
    delete body.path;
    delete body.cliente;
    delete body.codigo_cliente;

    // Salvar log do request
    saveRequest({
        "nome_cliente": req.body.cliente,
        "codigo_cliente": req.body.codigo_cliente,
        "url": path,
        "metodo": method,
        "payload": body
    });

    result = await axiosRequest(method, path, body);

    res.status(200).json(result);

});

async function axiosRequest(method, path, body) {
  return await axios({
    method: method,
    url: path,
    data: body
  }).then(async (axiosResponse) => {
    let statusCode = axiosResponse.status;
    let response = axiosResponse.data;
    return response;
  })
  .catch(function (error) {
    console.log(error);
    return null;
  });    
}

async function saveRequest(data){
    const newRequest = new Request(data);

    try {
        const request = await newRequest.save();
        if (!request) throw Error('Erro ao salvar dados.');
    } catch (err) {
        console.log(err);
    }
}

module.exports = router;
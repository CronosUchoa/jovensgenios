const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app); //protocolo http
const io = require('socket.io')(server) //websocket

app.use(express.static(path.join(__dirname, '../frontend/' )));
app.set('views', path.join(__dirname, 'frontend'));

app.use('/', (req,res)=>{
    res.render('index.html');
})

server.listen(3000, ()=>{
    console.log("Servidor : ativado - Port: 3000 - url: http://localhost:3000");
});
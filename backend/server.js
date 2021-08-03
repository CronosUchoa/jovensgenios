const express = require('express');
 const path = require('path');
 const cors = require('cors');

const app = express();
const server = require('http').createServer(app); //protocolo http
const io = require('socket.io')(server) //websocket

app.use(cors());
app.use(express.static(path.join(__dirname ,'../frontend/' )));
app.set('views', path.join(__dirname, '../frontend/'));



app.use('/', (req,res)=>{
    res.sendFile(__dirname +"../frontend/index.html");
});



io.on('connection', socket =>{
    console.log(`Aluno conectado : ID -- ${socket.id}`);
    socket.on('sendMessage', data =>{
        console.log(data);
    })

})

server.listen(process.env.PORT || 8080, ()=>{
    console.log("Servidor : ativado - Port: 8080 - url: http://localhost:8080");
});
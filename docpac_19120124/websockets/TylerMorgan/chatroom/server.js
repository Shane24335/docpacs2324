const express = require('express');
const http = require('http');
const Websocket = require('ws');

const port = 3000;
const server = http.createServer(express)
const wss = new Websocket.Server({ server })

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client != ws && client.readyState == Websocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        })
    })
})

server.listen(port, function() {
    console.log('server is good')
})
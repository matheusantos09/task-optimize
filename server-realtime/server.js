var aedes = require('aedes')()
var server = require('net').createServer(aedes.handle)
var port = 1883

server.listen(port, function () {
    console.log('server listening on port: ', port)
})

// aedes.subscribe('teste', function (a, b) {
//     console.log('A: ' + a)
//     console.log('B: ' + b)
// })

aedes.publish('teste', 'nova mensagem')
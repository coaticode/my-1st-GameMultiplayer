import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

game.subscribe((command) => {
    console.log('> Emitting ${command.type}')
    sockets.emit(command.type, command)
})

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 1})
game.addFruits({fruitId: 'fruit1', fruitX: 5, fruitY: 6})


sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log('> Player connected: ${playerId}')
    game.addPlayer({playerId: playerId})

    socket.emit('setup', game.state)
    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId})
        console.log('> Player Disconnected: ${playerId}')
    })
})

server.listen(3000, () =>{
    console.log('> Server listening on port 3000')
})
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const config = require('./config/db');
const users = require('./routes/user');

let usernames = {};
let roomMessages = {
    general: [],
    coding: [],
    gaming: []
}

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected')},
    err => {console.log('Cannot connect to the db, '+err)}
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

const PORT = process.env.PORT || 9000;
server.listen(PORT, '0.0.0.0')
console.log('Server running on port: ' + PORT);


function updateUsernames() {
    console.log('USERS: ', usernames)
    io.sockets.emit('users.login', usernames);
}

function updateMessageCache(roomId, message) {
    roomMessages[roomId].push(message)
    console.log(roomMessages)
}

io.sockets.on('connection', function(socket) {
    console.log("Socket connected with id " + socket.id);    
    
    socket.on('ROOM', function(roomId) {
        socket.join(roomId)
        socket.room = roomId
    })
    socket.on('PRIVATE_MESSAGE', function(data){
        const {reciever, sender, message} = data
        socket.to(usernames[reciever].id).emit('NEW_MESSAGE', {message: message, from: sender})
    })

    socket.on('SET_USERNAME', function(data){
        socket.username = data.username;
        usernames[socket.username] = { id: socket.id, room: socket.room }
        updateUsernames();
        
    });

    socket.on('SEND_MESSAGE', function(data){
        console.log('new message received to the server')
        updateMessageCache(data.roomId, {message: data.message, from: data.from})
        socket.to(data.roomId).emit('NEW_MESSAGE', {room: data.roomId, message: data.message, from: data.from})
    });

    socket.on('disconnect', function() {
        if (!socket.username) {
            console.log(`Someone disconnected: ${socket.id}`);
            return
        }
        console.log('User: '+ socket.username + ' disconnected');
        delete usernames[socket.username]
        updateUsernames();
    });
});
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

let usernames = [];

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected')},
    err => {console.log('Cannot connect to the db, '+err)}
);

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

const PORT = process.env.PORT || 9000;
server.listen(PORT)
console.log('Server running on port: ' + PORT);


function updateUsernames() {
    io.sockets.emit('usernames', usernames);
}

io.sockets.on('connection', function(socket) {
    console.log("Socket connected with id "+ socket.id);
    
    socket.on('SET_USERNAME', function(data){
        console.log(data)
        socket.username = data.username;
        usernames.push(socket.username);
        console.log('Username for id', socket.id, 'is: ', socket.username)
        updateUsernames();
    });

    socket.on('SEND_MESSAGE', function(data){
        console.log('new message recieved to the server')
        socket.emit('NEW_MESSAGE', {message: data.message, from: data.from})
        // socket.username = data;
        // usernames.push(socket.username);
        // console.log('Username for id', socket.id, 'is: ', socket.username)
        // updateUsernames();
    });

    socket.on('send_message', function(data){
        socket.broadcast.emit('new_message', {user: socket.username, msg: data});
    });

    socket.on('disconnect', function() {
        if (!socket.username) {
            console.log('Someone disconnected');
            return
        }
        console.log('User: '+ socket.username + ' disconnected');
        usernames.splice(usernames.indexOf(socket.username), 1);
        updateUsernames();
    });
});
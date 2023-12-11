import express from 'express';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; // Import the path module
import { Server } from "socket.io"; // Import the Server class from Socket.io
import { connect } from './config/config.js';
import { chatModel } from './chat.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
});

app.use(express.static(__dirname+'/public'))

server.listen(3000, () => {
    console.log("Server listening on port 3000");
    connect();
});

//storing the number of clients
let socketConnected=new Set();

//doing socket
//we are using http server here
const io = new Server(server); // Initialize Socket.io
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);
    socketConnected.add(socket.id);
    //now we will emit this
    io.emit('clients-total',socketConnected.size)
    


    //getting all the previous conversations
    socket.on("join",(data)=>{
        chatModel.find().sort({timeStamp:1}).limit(50)
        .then(messages=>{
            socket.emit('load_messages',messages);
        }).catch(err=>{
            console.log(err);
        })
    })

   
    

    // Handle events here
    //now getting the event message send by the client
    socket.on('message',(msg)=>{
       console.log(msg);
        //now we have to send this message to all over clients
        //like how ever clients are connected to this server
        // we need to send this message to everyone

        const newChat=new chatModel({
            name:msg.user,
            message:msg.message,
            timeStamp:msg.dateTime
        })
        newChat.save();
        socket.broadcast.emit('message',msg);
    })

    socket.on('feedback',(data)=>{
        socket.broadcast.emit('feedback',data);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected',socket.id);
        socketConnected.delete(socket.id);
        io.emit('clients-total',socketConnected.size)

    });
});

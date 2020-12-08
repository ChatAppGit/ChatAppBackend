'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

// const Ws = use('Ws')

// Ws
//   .channel('room:*', 'RoomUpdateController')

const Room = use('App/Models/Room');
const Message = use('App/Models/Message');
const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

io.on('connection', function (socket) {
  console.log("connennnnnnn", socket.id)


  socket.on('chat', async (msg) => {

    msg['read_status'] = 2
    msg['room_id'] = "room8"
    const message = await Message.create(msg);
    console.log('message: ' + message);
    // io.emit(msg.room_id, message);
    io.emit('chat', message);
  });


  socket.on('chatUp', async (msg) => {

    const message = await Message.query().where({ 'id': msg.id }).update({ "read_status": 3 })
    msg['read_status'] = 3
    console.log('message:iiiiii ' + message);
    // io.emit(msg.room_id, message);
    io.emit('chatUp', msg);
  });

})

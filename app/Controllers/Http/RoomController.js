'use strict';

const uuidv4 = require('uuid/v4');
const User = use('App/Models/User')
const Room = use('App/Models/Room');
const Message = use('App/Models/Message');

const { broadcast } = require('../../utils/socket.utils');

class RoomController {

    async create(request, response) {
        const room = new Room();
        const uuid = uuidv4();
        room.uuid = uuid;
        await room.save();
        return Room.find(uuid)
    }

    async createMessage({ params, request, response }) {
        try {
            const room = await Room.findBy({ 'uuid': params.id });
            if (!room) {
                return response.notFound(`The room doesn't exist`)
            }
            const data = request.body;
            data['room_id'] = room.uuid
            const message = await Message.create(data);
            return response.json({ 'message': message, 'status': true, })
        }
        catch (error) {
            console.error();
            console.log(error)
        }

    }



    async messageList({ response, auth }) {
        try {
            const userAuth = await auth.user
            const user = await User.findBy({ "id": userAuth.id })
            if (user !== null) {
                await Message.query().where({ 'room_id': 'room8' }).update({ "read_status": 3 })
                const messList = await Message.query().where({ 'room_id': 'room8' }).fetch()
                return response.json({ 'data': messList, 'status': true, 'error': null, })

            }
            else {
                return response.json({ 'token': null, 'status': false, 'error': null })
            }

        }
        catch (error) {
            console.log(error)
            return response.json({ 'status': false, 'error': "Invalid Credential" })
        }

    }







}

module.exports = RoomController;

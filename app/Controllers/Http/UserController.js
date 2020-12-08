'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Hash = use('Hash')
const Database = use('Database')
const Room = use('App/Models/Room');


class UserController {

    async newRegistration({ request, response, auth }) {
        try {
            const user = await User.create(request.body)
            const token = await auth.withRefreshToken().generate(user)
            Object.assign(user, token)
            return response.json({ 'status': true, 'token': token.token, 'error': null, 'msg': "Sucessfully Registred !!! " })
        }
        catch (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                return response.json({ 'status': false, 'error': error, 'msg': "Email already Exits!!!" })
            }
            else {
                return response.json({ 'status': false, 'error': error, 'msg': "Something going wrong !!!" })
            }

        }
    }


    async loginUser({ request, response, auth }) {
        try {
            const user = await User.findBy({ "email": request.body.email })
            if (user != null) {
                const isSame = await Hash.verify(request.body.password, user.password)
                if (isSame) {
                    const tokendetail = await Token.findBy({ 'user_id': user.id })
                    if (tokendetail != null) {
                        await Token.query().where({ 'user_id': user.id }).update({ is_revoked: true })
                    }
                    const token = await auth.withRefreshToken().generate(user)
                    return response.json({ 'token': token.token, "user": user, 'status': true, 'error': null, msg: 'Successfully login' })
                }
                else {
                    return response.json({ 'status': false, 'msg': "Wrong Password !!!" })
                }
            }
            else {
                return response.json({ 'status': false, 'msg': "Invalid Username !!!!" })
            }
        }
        catch (error) {
            console.log(error)
            return response.json({ 'status': false, 'error': error, 'msg': 'Invalid Credential!!!' })
        }

    }



    async me({ request, response, auth }) {
        try {
            const userAuth = await auth.user
            const user = await User.findBy({ "id": userAuth.id })
            if (user !== null) {

                return response.json({ 'user': user, 'status': true, 'error': null, })

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


    async getUserList({ response, auth }) {
        try {
            const userAuth = await auth.user
            const user = await User.findBy({ "id": userAuth.id })
            if (user !== null) {
                const userList = await Database.from('users').whereNotIn('id', [user.id])
                console.log(userList)
                return response.json({ 'status': true, data: userList, 'error': null, })

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

module.exports = UserController

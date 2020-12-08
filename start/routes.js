'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.group(() => {

  Route.post('registration', 'UserController.newRegistration')
  Route.post('login', 'UserController.loginUser')
  Route.get('me', 'UserController.me').middleware('auth')
  Route.get('getUserList', 'UserController.getUserList').middleware('auth')

}).prefix('api/login')

Route.group(() => {
  Route.post('', 'RoomController.create')
  Route.get('messageList', 'RoomController.messageList').middleware('auth')
  Route.post(':id', 'RoomController.createMessage')
})
  .prefix('api/rooms')




Route.group(() => {

  Route.post('upload', 'FileController.upload')
  Route.get('download/:fileName', 'FileController.download')

}).prefix('api/file/')


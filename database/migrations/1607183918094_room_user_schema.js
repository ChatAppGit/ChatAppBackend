'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomUserSchema extends Schema {
  up () {
    this.create('room_users', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('room_users')
  }
}

module.exports = RoomUserSchema

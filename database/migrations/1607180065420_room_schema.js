'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up() {
    this.table('rooms', (table) => {
      // alter table
      table.integer('sender_id')
      table.integer('receiver_id')
    })
  }

  down() {
    this.table('rooms', (table) => {
      // reverse alternations
    })
  }
}

module.exports = RoomSchema

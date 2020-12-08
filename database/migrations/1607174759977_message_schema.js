'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up() {
    this.table('messages', (table) => {
      // alter table
      table.integer('read_status').default(1)
    })
  }

  down() {
    this.table('messages', (table) => {
      // reverse alternations
    })
  }
}

module.exports = MessageSchema

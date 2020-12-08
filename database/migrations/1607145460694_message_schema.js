'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up() {
    this.create('messages', (table) => {
      table.increments()
      table.timestamps()
      table.uuid('room_id').references('uuid').inTable('rooms').onDelete('CASCADE')

      table.integer('sender_id').notNullable()
      table.string('name').notNullable()
      table.text('message').notNullable()
      table.string('file_type').notNullable()
      table.text('file_url').notNullable()
    })
  }

  down() {
    this.drop('messages')
  }
}

module.exports = MessageSchema

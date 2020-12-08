'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.table('users', (table) => {
      // alter table
      table.text('profile', 'longtext')
      table.text('fcm_token', 'longtext').nullable()
      table.boolean('status').default(1)
    })
  }

  down() {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UserSchema

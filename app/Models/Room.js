'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Room extends Model {
    static get hidden() {
        return ['id']
    }

    static get primaryKey() {
        return 'uuid'
    }

    messages() {
        return this.hasMany('App/Models/Message')
    }
}

module.exports = Room

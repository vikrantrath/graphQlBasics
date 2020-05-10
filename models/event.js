const { getEventsSQL, saveEventSQL, getEventsByUserIdSQL } = require('../Repo/repoHelper')

class Event {
    constructor(title, description, price, date, creatorId) {
        this._id = undefined
        this.title = title
        this.description = description
        this.price = price
        this.date = date
        this.creatorId = creatorId
    }

    setId(id) {
        this._id = id
        return this
    }

    save() {
        return new Promise((resolve, reject) => {
            const conn = require("../dbConn")
            conn.query(saveEventSQL, [this.title, this.description, this.price, this.date, this.creatorId], function (err, result) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result.insertId)
                }
            })
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            const conn = require("../dbConn")
            conn.query(getEventsSQL, function (err, result) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
        })
    }

    static getEventsByUserId(creatorId) {
        return new Promise((resolve, reject) => {
            const conn = require("../dbConn")
            conn.query(getEventsByUserIdSQL, [creatorId], function (err, result) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = Event;
const { getUsersSQL, saveUserSQL } = require('../Repo/repoHelper')

class User {
    constructor(email, password) {
        this._id = undefined
        this.email = email;
        this.password = password;
    }

    setId(id) {
        this._id = id;
        return this;
    }

    save() {
        return new Promise((resolve, reject) => {
            const conn = require("../dbConn")
            conn.query(saveUserSQL, [this.email, this.password], function (err, result) {
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
            conn.query(getUsersSQL, function (err, result) {
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

module.exports = User;
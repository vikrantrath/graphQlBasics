const saveEventSQL = `Insert into event(title,description,price,date,creator_id) values(?,?,?,?,?)`

const getEventsSQL = `select * from event`;

const getEventsByUserIdSQL = `select * from event where creator_id=?`;

const getUsersSQL = `select * from user`;

const saveUserSQL = `Insert into user(email,password) values(?,?)`

module.exports = {
    saveEventSQL,
    getEventsSQL,
    getUsersSQL,
    saveUserSQL,
    getEventsByUserIdSQL
}
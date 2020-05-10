const express = require('express');
const expressGraphQl = require('express-graphql');
const Event = require('./models/event')
const User = require('./models/user')

const {
    buildSchema
} = require('graphql');

const app = express();

const schema = buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creatorId: Int!
        }

    type User {
        _id : ID!
        email : String!
        password : String
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String
        creatorId: Int!
    }

    input UserInput {
        email : String!
        password : String!
    }


    type RootQuery {
        events : [Event!]!
        users : [User!]!
        userEvents(creatorId: Int!) : [Event!]!
    }

    type RootMutation {
        createEvent(evt: EventInput): Event
        createUser(usr: UserInput): User 
    }

    schema {
        query :  RootQuery
        mutation : RootMutation
    }
`)

app.use('/graphql', expressGraphQl({
    schema: schema,
    graphiql: true,
    rootValue: {
        events: () => {
            return Event.getAll().then(res => res).catch(err => console.error(err))
        },
        createEvent: ({ evt }) => {
            const event = new Event(evt.title, evt.description, +evt.price, new Date().toISOString().slice(0, 10), evt.creatorId)
            return event.save().then(id => event.setId(id)).catch(err => console.error(err));
        },
        users: () => {
            return User.getAll().then(res => res).catch(err => console.error(err))
        },
        createUser: ({ usr }) => {
            const user = new User(usr.email, usr.password)
            return user.save().then(id => user.setId(id)).catch(err => console.error(err));
        },
        userEvents: ({ creatorId }) => {
            return Event.getEventsByUserId(creatorId).then(res => res).catch(err => console.error(err))
        }
    }
}))

app.listen(5000, () => console.log('Server Running on Port',5000));
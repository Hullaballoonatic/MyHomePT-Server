import jwt from './helpers/jwt.service'
import auth from './routes/auth.router'
import signout from './routes/signout.router'
import users from './routes/users.router'
import tasks from './routes/tasks.router'
import exercises from './routes/exercises.router'
import inspiration from './routes/inspiration.router'
import errorHandler from './helpers/error-handler'
import serverSettings from './config/server'
import dbSettings from './config/database'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(jwt.routeParam())

app.use('/api/auth', auth)
app.use('/api/signout', signout)
app.use('/api/users', users)
app.use('/api/tasks', tasks)
app.use('/api/exercises', exercises)
app.use('/api/inspiration', inspiration)

app.use(errorHandler)

mongoose.connect(dbSettings.connectionString, {useNewUrlParser: true})
    .then(() => listen())
    .catch((err: any) => console.log(err))

function listen() {
    if (app.get('env') !== 'test') {
        app.listen(serverSettings.port, () => console.log(`Server listening on port ${serverSettings.port}`))
    }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_service_1 = __importDefault(require("./helpers/jwt.service"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const signout_router_1 = __importDefault(require("./routes/signout.router"));
const users_router_1 = __importDefault(require("./routes/users.router"));
const tasks_router_1 = __importDefault(require("./routes/tasks.router"));
const exercises_router_1 = __importDefault(require("./routes/exercises.router"));
const inspiration_router_1 = __importDefault(require("./routes/inspiration.router"));
const error_handler_1 = __importDefault(require("./helpers/error-handler"));
const server_1 = __importDefault(require("./config/server"));
const database_1 = __importDefault(require("./config/database"));
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt_service_1.default.routeParam());
app.use('/api/auth', auth_router_1.default);
app.use('/api/signout', signout_router_1.default);
app.use('/api/users', users_router_1.default);
app.use('/api/tasks', tasks_router_1.default);
app.use('/api/exercises', exercises_router_1.default);
app.use('/api/inspiration', inspiration_router_1.default);
app.use(error_handler_1.default);
mongoose.connect(database_1.default.connectionString, { useNewUrlParser: true })
    .then(() => listen())
    .catch((err) => console.log(err));
function listen() {
    if (app.get('env') !== 'test') {
        app.listen(server_1.default.port, () => console.log(`Server listening on port ${server_1.default.port}`));
    }
}
//# sourceMappingURL=server.js.map
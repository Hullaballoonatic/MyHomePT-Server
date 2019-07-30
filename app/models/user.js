"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_service_1 = __importDefault(require("../helpers/jwt.service"));
const task_1 = __importDefault(require("./task"));
const revokedToken_1 = __importDefault(require("./revokedToken"));
const media_1 = __importDefault(require("./plugins/media"));
const timestamp_1 = __importDefault(require("./plugins/timestamp"));
const saltRounds = 10;
const schema = mongoose_1.default.Schema({
    signedInOn: Date,
    signedOutOn: Date,
    name: Object,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validateBeforeSave: true,
        validate: {
            validator: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: 'You must enter a valid email address.',
        },
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: [6, 'Password needs to be at least 6 letters long.'],
    },
    therapistIds: [
        { type: String },
    ],
    patientIds: [
        { type: String },
    ],
    taskIds: [
        { type: String },
    ],
    createdExerciseIds: [
        { type: String },
    ],
    bodyParts: [Object],
    privilege: {
        type: Number,
        default: 0,
    },
    address: Object,
    sex: Object,
    phoneNumber: Object,
    birthday: Date,
});
schema.plugin(timestamp_1.default);
schema.plugin(media_1.default);
schema.methods = {
    authenticate(plainText) {
        const user = this;
        return new Promise((resolve, reject) => {
            if (bcryptjs_1.default.compareSync(plainText, user.password)) {
                user.signedInOn = Date.now();
                user.save().then(() => resolve(jwt_service_1.default.getToken(user))).catch(reject);
            }
            else {
                reject('Password invalid.');
            }
        });
    },
    signOut(token) {
        const user = this;
        return new Promise((resolve, reject) => {
            revokedToken_1.default.create(token).then(() => {
                user.signedOutOn = Date.now();
                user.save().then(resolve).catch(reject);
            }).catch(reject);
        });
    },
};
schema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = bcryptjs_1.default.hashSync(this.password, saltRounds);
    }
    if (!this.name.display) {
        this.name.display = `${this.name.given} ${this.name.family}`;
    }
    next();
});
schema.pre('remove', function (next) {
    const user = this;
    model.update({ _id: { $in: user.therapistIds } }, { $pull: { patientIds: user._id } }, err => {
        if (err)
            next(err);
        model.update({ _id: { $in: user.patientIds } }, { $pull: { therapistIds: user._id } }, err => {
            if (err)
                next(err);
            return task_1.default.findAndDelete({ _id: { $in: user.taskIds } });
        });
    });
    next();
});
schema.set('toJSON', { virtuals: true });
const model = mongoose_1.default.model('User', schema);
exports.default = model;
//# sourceMappingURL=user.js.map
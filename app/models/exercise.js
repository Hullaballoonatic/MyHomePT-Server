"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./user"));
const media_1 = __importDefault(require("./plugins/media"));
const timestamp_1 = __importDefault(require("./plugins/timestamp"));
const schema = new mongoose_1.default.Schema({
    creatorId: String,
    bodyPart: String,
    title: { type: String, default: 'Unnamed Exercise' },
    link: String,
    description: String,
    videoUrl: String,
});
schema.plugin(timestamp_1.default);
schema.plugin(media_1.default);
schema.set('toJSON', { virtuals: true });
schema.post('save', function (next) {
    user_1.default.find({ _id: this.creatorId }).then(user => {
        user.createdExerciseIds.push(this._id);
        return user.save();
    }).catch(next);
    next();
});
schema.pre('remove', function (next) {
    const exercise = this;
    user_1.default.find({ _id: this.creatorId }).then(user => {
        user.createdExerciseIds.splice(user.createdExerciseIds.indexOf(exercise._id), 1);
        return user.save();
    }).catch(next);
    next();
});
exports.default = mongoose_1.default.model('Exercise', schema);
//# sourceMappingURL=exercise.js.map
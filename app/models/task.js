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
    issuerId: String,
    targetId: String,
    exerciseId: String,
    title: String,
    holdTime: {
        amount: Number,
        unit: String,
    },
    numReps: { type: Number, default: 1 },
    numSets: { type: Number, default: 1 },
    frequency: {
        times: Number,
        period: {
            amount: Number,
            unit: String,
        },
    },
    completeBy: Date,
    details: String,
    setRecordings: [{
            startedOn: Date,
            completedOn: Date,
            recording: [Number],
        }],
});
schema.plugin(timestamp_1.default);
schema.plugin(media_1.default);
schema.post('save', function () {
    return user_1.default.updateOne({ _id: this.targetId }, { $push: { taskIds: this._id } });
});
schema.pre('remove', function () {
    console.log(`running middleware for remove call on task (${this._id})`);
    return user_1.default.updateOne({ _id: this.targetId }, { $pull: { taskIds: [this._id] } });
});
schema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.default.model('Task', schema);
//# sourceMappingURL=task.js.map
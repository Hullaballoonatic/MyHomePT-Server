"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const timestamp_1 = __importDefault(require("./plugins/timestamp"));
const media_1 = __importDefault(require("./plugins/media"));
const schema = mongoose_1.default.Schema({
    message: { type: String, required: true },
});
schema.plugin(timestamp_1.default);
schema.plugin(media_1.default);
schema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.default.model('Inspiration', schema);
//# sourceMappingURL=inspiration.js.map
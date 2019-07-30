"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const timestamp_1 = __importDefault(require("./plugins/timestamp"));
const schema = new mongoose_1.default.Schema({
    sub: { type: String, required: true },
    jti: { type: String, required: true },
    exp: { type: Date, required: true, index: true },
});
schema.plugin(timestamp_1.default);
schema.virtual('revoked_on').get(() => {
    return this.createdOn;
});
schema.virtual('is_expired').get(() => {
    return this.exp < Date.now();
});
schema.statics.purgeExpired = () => {
    this.deleteMany({ is_expired: true }).catch(console.log);
};
exports.default = mongoose_1.default.model('RevokedToken', schema);
//# sourceMappingURL=revokedToken.js.map
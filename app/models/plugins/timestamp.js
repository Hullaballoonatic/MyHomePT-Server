"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = schema => {
    schema.add({ createdOn: Date, updatedOn: Date });
    schema.pre('save', function (next) {
        this.updatedOn = Date.now();
        if (this.isNew) {
            this.createdOn = this.updatedOn;
        }
        next();
    });
};
//# sourceMappingURL=timestamp.js.map
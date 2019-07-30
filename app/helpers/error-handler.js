"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    // todo: fix this up for more status codes
    if (typeof (err) === 'string' || err.name === 'ValidationError') {
        res.status(400).json({ message: err.message });
    }
    else if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'Invalid Token' });
    }
    else if (err.status === 404) {
        res.status(404).json({ message: 'Not found.' });
    }
    else {
        res.status(500).json({ message: err.message });
    }
    next();
};
//# sourceMappingURL=error-handler.js.map
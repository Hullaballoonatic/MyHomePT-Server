"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../controllers/auth"));
const router = express_1.Router();
router.route('/')
    .post(auth_1.default.signout);
exports.default = router;
//# sourceMappingURL=signout.router.js.map
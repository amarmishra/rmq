"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_interface_1 = __importDefault(require("../utils/error/error.interface"));
function ErrorHandler(error, req, res, next) {
    if (error instanceof error_interface_1.default) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Some error occured' });
}
exports.default = ErrorHandler;

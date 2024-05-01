"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_service_1 = __importDefault(require("./db.service"));
const post_model_1 = __importDefault(require("@/models/post.model"));
class PostService extends db_service_1.default {
    constructor() {
        super(post_model_1.default);
    }
}
exports.default = new PostService();

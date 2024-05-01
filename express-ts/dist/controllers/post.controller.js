"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_interface_1 = __importDefault(require("../utils/error/error.interface"));
const express_1 = require("express");
const post_service_1 = __importDefault(require("../service/post.service"));
class PostController {
    constructor() {
        this.path = '/posts';
        this.router = (0, express_1.Router)();
        this.initiateRoutes();
    }
    initiateRoutes() {
        this.router.post(this.path, this.create);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description } = req.body;
                const post = yield post_service_1.default.create({ title, description });
            }
            catch (err) {
                next(new error_interface_1.default(500, 'Erro while creating post'));
            }
        });
    }
}
exports.default = PostController;

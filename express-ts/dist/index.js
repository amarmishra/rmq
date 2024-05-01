"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const post_controller_1 = __importDefault(require("./controllers/post.controller"));
const app_1 = __importDefault(require("./app"));
const port = 3000;
const app = new app_1.default([new post_controller_1.default()], port);
app.listen();

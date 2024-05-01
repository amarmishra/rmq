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
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor(controllers, port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.connectDb();
        this.setUpMiddleWares();
        this.intializeRoutes(controllers);
        this.setErrorHandler();
    }
    connectDb() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default.connect(`mongodb+srv://amarm130:meomanooz123@mongodb-cluster.6dxqaqj.mongodb.net/`);
        });
    }
    setUpMiddleWares() {
        this.app.use(express_1.default.json());
    }
    intializeRoutes(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }
    setErrorHandler() {
        this.app.use(error_middleware_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}
exports.default = App;

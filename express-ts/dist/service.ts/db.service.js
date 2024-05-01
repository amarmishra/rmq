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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseDBClass {
    constructor(model) {
        this.model = model;
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.model.findOne({ _id: id }).lean();
            }
            catch (error) {
                throw new Error('Error while finding document');
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.model.find();
            }
            catch (err) {
                throw new Error('Error while finding documents');
            }
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.model.create(body);
            }
            catch (err) {
                throw new Error('Error while finding documents');
            }
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.updateOne({ _id: id }, { $set: update }).exec();
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findByIdAndDelete({ $where: { _id: id } });
        });
    }
}
exports.default = BaseDBClass;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        model: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            }]
    },
    description: {
        type: String,
        required: true
    },
});
exports.default = (0, mongoose_1.model)('Post', PostSchema);

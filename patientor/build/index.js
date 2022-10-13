"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
const port = process.env.PORT || 3005;
const start = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();

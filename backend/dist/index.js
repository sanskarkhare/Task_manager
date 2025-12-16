"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const socketHandler_1 = require("./socket/socketHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/tasks', task_routes_1.default);
app.use('/api/notifications', notification_routes_1.default);
app.get('/', (req, res) => {
    res.send('Task Manager API');
});
const server = http_1.default.createServer(app);
(0, socketHandler_1.initSocket)(server);
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

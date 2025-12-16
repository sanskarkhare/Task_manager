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
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_dto_1 = require("../dtos/auth.dto");
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = auth_dto_1.CreateUserSchema.parse(req.body);
                const { user, token } = yield this.authService.register(data);
                res.status(201).json({ user, token });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = auth_dto_1.LoginSchema.parse(req.body);
                const { user, token } = yield this.authService.login(data);
                res.json({ user, token });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.authService.getAllUsers();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const user = yield this.authService.getProfile(userId);
                res.json(user);
            }
            catch (error) {
                res.status(404).json({ error: error.message });
            }
        });
        this.updateProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const data = auth_dto_1.UpdateProfileSchema.parse(req.body);
                const user = yield this.authService.updateProfile(userId, data);
                res.json(user);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;

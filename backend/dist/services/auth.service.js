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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositories/user.repository");
const jwt_1 = require("../config/jwt");
class AuthService {
    constructor() {
        this.userRepo = new user_repository_1.UserRepository();
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.userRepo.findByEmail(data.email);
            if (existing) {
                throw new Error('User already exists');
            }
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            const user = yield this.userRepo.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            const token = (0, jwt_1.signToken)({ id: user.id });
            return { user, token };
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findByEmail(data.email);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const valid = yield bcrypt_1.default.compare(data.password, user.password);
            if (!valid) {
                throw new Error('Invalid credentials');
            }
            const token = (0, jwt_1.signToken)({ id: user.id });
            return { user, token };
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.findAll();
        });
    }
}
exports.AuthService = AuthService;

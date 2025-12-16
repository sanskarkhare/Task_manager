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
exports.markRead = exports.getNotifications = void 0;
const notification_service_1 = require("../services/notification.service");
const notificationService = new notification_service_1.NotificationService();
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId; // Assuming auth middleware adds user to req
        const notifications = yield notificationService.getUserNotifications(userId);
        res.json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});
exports.getNotifications = getNotifications;
const markRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notification = yield notificationService.markAsRead(id);
        res.json(notification);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
});
exports.markRead = markRead;

/**
 * Central export file for all DevStream services
 *
 * This file provides a single import point for all API services
 * Usage: import { userService, socialService, ... } from '@/services'
 */

// Core services
export { default as apiClient } from "./apiSauce";
export { authService } from "./authService";
export * from "./session.service";

// Feature services
export { default as userService, UserService } from "./user.service";
export { default as socialService, SocialService } from "./social.service";
export { default as mediaService, MediaService } from "./media.service";
export { default as chatService, ChatService } from "./chat.service";
export { default as callService, CallService } from "./call.service";
export { default as followService, FollowService } from "./follow.service";
export {
  default as calendarService,
  CalendarService,
} from "./calendar.service";
export {
  default as jobDescriptionService,
  JobDescriptionService,
} from "./job-description.service";
export {
  default as notificationService,
  NotificationService,
} from "./notification.service";
export {
  default as devStreamService,
  DevStreamService,
} from "./devstream.service";
export { socketService } from "./socket.service";

// Type exports
export type { AuthUserDetail } from "@/interfaces/user.interface";
export type { Post, Comment, Like } from "./social.service";
export type { FileAsset, Music } from "./media.service";
export type { Conversation, ConversationMember, Message } from "./chat.service";
export type { CallSession, CallParticipant } from "./call.service";
export type { Follow } from "./follow.service";
export type {
  CalendarEvent,
  CalendarParticipant,
  EventType,
} from "./calendar.service";
export type {
  JobDescription,
  JobApplication,
  JobDescriptionStatus,
  ApplicationStatus,
} from "./job-description.service";
export type { Notification } from "./notification.service";
export type {
  DeveloperMachine,
  Agent,
  Container,
  DatabaseInstance,
  EditorSession,
} from "./devstream.service";

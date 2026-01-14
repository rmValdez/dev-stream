"use client";
import apiClient from "./apiSauce";

export type EventType =
  | "CALL"
  | "JOB_INTERVIEW"
  | "LIVE_STREAM"
  | "MEETING"
  | "DEADLINE";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startAt: string;
  endAt: string;
  type: EventType;
  ownerId: string;
  jobId?: string;
  callSessionId?: string;
  conversationId?: string;
  createdAt: string;
  participants?: CalendarParticipant[];
}

export interface CalendarParticipant {
  eventId: string;
  userId: string;
  role: string;
  user?: any;
}

export class CalendarService {
  /**
   * Create a calendar event
   */
  async createEvent(data: {
    title: string;
    description?: string;
    startAt: string;
    endAt: string;
    type: EventType;
    ownerId: string;
    jobId?: string;
    callSessionId?: string;
    conversationId?: string;
  }) {
    const response = await apiClient.post("/calendar", data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to create event");
    }
    return response.data as CalendarEvent;
  }

  /**
   * List user's calendar events
   */
  async listUserEvents(userId: string) {
    const response = await apiClient.get(`/calendar/user/${userId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch events");
    }
    return response.data as CalendarEvent[];
  }

  /**
   * Get event details
   */
  async getEvent(eventId: string) {
    const response = await apiClient.get(`/calendar/${eventId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch event");
    }
    return response.data as CalendarEvent;
  }

  /**
   * Update an event
   */
  async updateEvent(eventId: string, data: Partial<CalendarEvent>) {
    const response = await apiClient.put(`/calendar/${eventId}`, data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to update event");
    }
    return response.data as CalendarEvent;
  }

  /**
   * Delete an event
   */
  async deleteEvent(eventId: string) {
    const response = await apiClient.delete(`/calendar/${eventId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to delete event");
    }
    return response.data;
  }

  /**
   * Add participant to event
   */
  async addParticipant(eventId: string, userId: string, role: string) {
    const response = await apiClient.post("/calendar/participants", {
      eventId,
      userId,
      role,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to add participant");
    }
    return response.data;
  }
}

export const calendarService = new CalendarService();
export default calendarService;

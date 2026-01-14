"use client";

import { useState, useEffect, useCallback } from "react";
import calendarService, { CalendarEvent } from "@/services/calendar.service";
import { useAuthStore } from "@/store/auth.store";
import EventModal from "./EventModal";

interface CalendarProps {
  onEventClick?: (event: CalendarEvent) => void;
}

export default function Calendar({ onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const { user } = useAuthStore();

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Fetch events with useCallback to avoid dependency issues
  const fetchEvents = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const data = await calendarService.listUserEvents(user.id);
      setEvents(data || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch events when user or date changes
  useEffect(() => {
    if (user?.id) {
      fetchEvents();
    }
  }, [user?.id, currentDate, fetchEvents]);

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Navigation
  const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Get events for a specific date
  const getEventsForDate = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startAt);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  // Event type colors
  const getEventColor = (type: string) => {
    const colors: Record<string, string> = {
      MEETING: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
      CALL: "bg-green-500/20 text-green-600 dark:text-green-400",
      DEADLINE: "bg-red-500/20 text-red-600 dark:text-red-400",
      JOB_INTERVIEW: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
      LIVE_STREAM: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
    };
    return colors[type] || "bg-blue-500/20 text-blue-600 dark:text-blue-400";
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  // Handle event click
  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEvent(event);
    setIsModalOpen(true);
    onEventClick?.(event);
  };

  // Handle save event
  const handleSaveEvent = async (eventData: any) => {
    if (!user?.id) {
      console.error("User not authenticated");
      return;
    }

    try {
      if (editingEvent) {
        // Update existing event
        await calendarService.updateEvent(editingEvent.id, {
          title: eventData.title,
          description: eventData.description,
          startAt: eventData.startTime?.toISOString(),
          endAt: eventData.endTime?.toISOString(),
          type: eventData.type,
        });
      } else {
        // Create new event
        await calendarService.createEvent({
          title: eventData.title,
          description: eventData.description,
          startAt: eventData.startTime.toISOString(),
          endAt: eventData.endTime.toISOString(),
          type: eventData.type,
          ownerId: user.id,
        });
      }
      fetchEvents();
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  // Handle delete event
  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await calendarService.deleteEvent(eventId);
      fetchEvents();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  // Generate calendar days
  const calendarDays = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(
      <div
        key={`empty-${i}`}
        className="aspect-square p-2 bg-black/5 dark:bg-white/5 rounded-lg"
      />
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDate(day);
    const today = isToday(day);

    calendarDays.push(
      <div
        key={day}
        onClick={() => handleDateClick(new Date(year, month, day))}
        className={`aspect-square p-2 rounded-lg border transition-all cursor-pointer ${
          today
            ? "bg-primary/10 border-primary/30 ring-2 ring-primary/20"
            : "bg-white dark:bg-black/20 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-sm font-bold ${
                today ? "text-primary" : "text-slate-900 dark:text-white"
              }`}
            >
              {day}
            </span>
            {dayEvents.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold">
                {dayEvents.length}
              </span>
            )}
          </div>
          <div className="flex-1 space-y-1 overflow-hidden">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                onClick={(e) => handleEventClick(event, e)}
                className={`text-[10px] px-1 py-0.5 rounded truncate hover:opacity-80 transition-opacity ${getEventColor(
                  event.type
                )}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-[10px] text-slate-500 dark:text-white/40 px-1">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 rounded-2xl bg-black/20 border border-white/5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              calendar_month
            </span>
            Calendar
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedDate(new Date());
                setEditingEvent(null);
                setIsModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary text-xs font-medium transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Event
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        {/* Month/Year Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white">
              chevron_left
            </span>
          </button>
          <h4 className="text-xl font-bold text-white">
            {monthNames[month]} {year}
          </h4>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white">
              chevron_right
            </span>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold text-white/60 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">
              progress_activity
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2">{calendarDays}</div>
        )}

        {events.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-xs text-white/60">
              {events.length} event{events.length !== 1 ? "s" : ""} this month
            </div>
          </div>
        )}
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDate(null);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        selectedDate={selectedDate || undefined}
        editEvent={editingEvent}
      />

      {/* Event Details/Delete (when editing) */}
      {editingEvent && isModalOpen && (
        <div className="fixed bottom-4 right-4 z-[60]">
          <button
            onClick={() => handleDeleteEvent(editingEvent.id)}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold shadow-lg transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Delete Event
          </button>
        </div>
      )}
    </>
  );
}

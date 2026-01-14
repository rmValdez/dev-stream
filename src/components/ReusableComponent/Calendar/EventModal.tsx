"use client";

import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";

interface CalendarEvent {
  id?: string | undefined;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  selectedDate?: Date;
  editEvent?: CalendarEvent | null;
}

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  editEvent,
}: EventModalProps) {
  // Initialize state from props
  const getInitialTitle = () => editEvent?.title || "";
  const getInitialDescription = () => editEvent?.description || "";
  const getInitialType = () => editEvent?.type || "MEETING";

  const getInitialDateRange = () => {
    if (editEvent?.startTime && editEvent?.endTime) {
      return {
        startDate: dayjs(editEvent.startTime).format("YYYY-MM-DD"),
        endDate: dayjs(editEvent.endTime).format("YYYY-MM-DD"),
      };
    }
    if (selectedDate) {
      return {
        startDate: dayjs(selectedDate).format("YYYY-MM-DD"),
        endDate: dayjs(selectedDate).format("YYYY-MM-DD"),
      };
    }
    return { startDate: null, endDate: null };
  };

  const getInitialStartTime = () => {
    if (editEvent?.startTime) {
      return dayjs(editEvent.startTime).format("HH:mm");
    }
    return "09:00";
  };

  const getInitialEndTime = () => {
    if (editEvent?.endTime) {
      return dayjs(editEvent.endTime).format("HH:mm");
    }
    return "10:00";
  };

  // const [title, setTitle] = useState(getInitialTitle());
  // const [description, setDescription] = useState(getInitialDescription());
  // const [dateRange, setDateRange] = useState(getInitialDateRange());
  // const [startTime, setStartTime] = useState(getInitialStartTime());
  // const [endTime, setEndTime] = useState(getInitialEndTime());
  // const [eventType, setEventType] = useState(getInitialType());

  const [eventData, setEventData] = useState({
    title: getInitialTitle(),
    description: getInitialDescription(),
    dateRange: getInitialDateRange(),
    startTime: getInitialStartTime(),
    endTime: getInitialEndTime(),
    type: getInitialType(),
  });

  useEffect(() => {
    if (isOpen) {
      setEventData({
        title: getInitialTitle(),
        description: getInitialDescription(),
        dateRange: getInitialDateRange(),
        startTime: getInitialStartTime(),
        endTime: getInitialEndTime(),
        type: getInitialType(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editEvent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // const startDateTime = dayjs(
    //   `${dateRange.startDate} ${startTime}`,
    //   "YYYY-MM-DD HH:mm"
    // ).toDate();
    // const endDateTime = dayjs(
    //   `${dateRange.endDate || dateRange.startDate} ${endTime}`,
    //   "YYYY-MM-DD HH:mm"
    // ).toDate();

    // onSave({
    //   id: editEvent?.id,
    //   title,
    //   description,
    //   startTime: startDateTime,
    //   endTime: endDateTime,
    //   type: eventType,
    // });
    handleClose();
  };

  const handleClose = () => {
    setEventData({
      title: "",
      description: "",
      dateRange: { startDate: null, endDate: null },
      startTime: "09:00",
      endTime: "10:00",
      type: "MEETING",
    });
    onClose();
  };

  const handleDateChange = (newValue: any) => {
    console.log("newValue", newValue);
    // setDateRange(newValue);
  };

  const eventTypes = [
    {
      value: "MEETING",
      label: "Meeting",
      color: "bg-blue-500",
      icon: "groups",
    },
    { value: "CALL", label: "Call", color: "bg-green-500", icon: "call" },
    { value: "DEADLINE", label: "Deadline", color: "bg-red-500", icon: "flag" },
    {
      value: "JOB_INTERVIEW",
      label: "Interview",
      color: "bg-purple-500",
      icon: "work",
    },
    {
      value: "LIVE_STREAM",
      label: "Live Stream",
      color: "bg-orange-500",
      icon: "live_tv",
    },
  ];

  // Generate time options (15 min intervals)
  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const time = `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}`;
      timeOptions.push(time);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-gradient-to-r from-primary/10 to-purple-500/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">
              event
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {editEvent ? "Edit Event" : "Create Event"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              value={eventData.title}
              onChange={(e) =>
                setEventData({ ...eventData, title: e.target.value })
              }
              required
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="Enter event title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2">
              Description
            </label>
            <textarea
              value={eventData.description}
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm"
              placeholder="Enter event description"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2">
              Date *
            </label>
            <Datepicker
              value={eventData.startTime}
              onChange={handleDateChange}
              useRange={false}
              asSingle={true}
              primaryColor="blue"
              inputClassName="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              containerClassName="relative"
              popoverDirection="down"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2">
              Date *
            </label>
            <Datepicker
              value={eventData.endTime}
              onChange={handleDateChange}
              useRange={false}
              asSingle={true}
              primaryColor="blue"
              inputClassName="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              containerClassName="relative"
              popoverDirection="down"
            />
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2">
                Start Time *
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {dayjs(`2000-01-01 ${time}`).format("h:mm A")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2">
                End Time *
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {dayjs(`2000-01-01 ${time}`).format("h:mm A")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2">
              Event Type *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setEventType(type.value)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    eventType === type.value
                      ? `${type.color} text-white border-transparent shadow-lg`
                      : "bg-white dark:bg-black/20 border-black/10 dark:border-white/10 text-slate-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {type.icon}
                  </span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white text-sm font-bold transition-all shadow-lg"
            >
              {editEvent ? "Update" : "Create"} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

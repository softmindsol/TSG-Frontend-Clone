import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  FiCalendar,
  FiPhone,
  FiMapPin,
  FiSearch,
  FiChevronDown,
  FiPrinter,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiHome,
  FiClock,
  FiX,
  FiUser,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEventRange } from "../../store/features/event/service";
import {
  selectEvents,
  selectIsDeletingEvent,
  selectIsLoadingEvents,
} from "../../store/features/event/slice";
import AddNewEventModal from "./AddNewEventModal";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Swal from "sweetalert2";

// --- CONFIGURATION & CONSTANTS ---
const EVENT_TYPES = {
  VIEWING: "VIEWING",
  REVIEW: "REVIEW",
  MEETING: "MEETING",
  CALL: "CALL",
};

const EVENT_STYLES = {
  [EVENT_TYPES.VIEWING]: {
    icon: FiHome,
    color: "#F6B31D",
    bgColor: "#FEFCE8",
    badgeColor: "rgba(246, 179, 29, 0.1)",
  },
  [EVENT_TYPES.MEETING]: {
    icon: FiCalendar,
    color: "#00AC4F",
    bgColor: "#F0FDF4",
    badgeColor: "rgba(0, 172, 79, 0.1)",
  },
  [EVENT_TYPES.REVIEW]: {
    icon: FiCalendar,
    color: "#9333EA",
    bgColor: "#FAF5FF",
    badgeColor: "rgba(147, 51, 234, 0.1)",
  },
  [EVENT_TYPES.CALL]: {
    icon: FiPhone,
    color: "#374151",
    bgColor: "#F9FAFB",
    badgeColor: "rgba(107, 114, 128, 0.1)",
    dashed: true,
  },
};

const VIEW_MODES = ["Day", "Week", "Month"];
const TIME_SLOTS = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];
const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"]; // Adjusted for Date Picker
const CALENDAR_WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const initialUsers = [
  { id: 1, name: "Alex Thompson (You)", checked: true, role: "Agent" },
  { id: 2, name: "Maaz Khan", checked: false, role: "Agent" },
  { id: 3, name: "Samrana", checked: false, role: "Agent" },
  { id: 4, name: "Bilal Bhatti", checked: false, role: "Manager" },
  { id: 5, name: "George Bill", checked: false, role: "Agent" },
];

// --- UTILITY FUNCTIONS ---
const getWeekDates = (d) => {
  const s = new Date(d);
  const day = s.getDay();
  const diff = s.getDate() - day + (day === 0 ? -6 : 1);
  s.setDate(diff);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(s);
    date.setDate(s.getDate() + i);
    return date;
  });
};
const getMonthGrid = (d) => {
  const y = d.getFullYear(),
    m = d.getMonth();
  const firstDayOfWeek = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const days = [];
  const prevMonthLastDay = new Date(y, m, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--)
    days.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      date: new Date(y, m - 1, prevMonthLastDay - i),
    });
  for (let i = 1; i <= daysInMonth; i++)
    days.push({ day: i, isCurrentMonth: true, date: new Date(y, m, i) });
  const totalCells = 42;
  const remainingCells = totalCells - days.length;
  for (let i = 1; i <= remainingCells; i++)
    days.push({ day: i, isCurrentMonth: false, date: new Date(y, m + 1, i) });
  return days;
};
const isSameDay = (d1, d2) =>
  d1 && d2 && d1.toDateString() === d2.toDateString();
const formatHeaderDate = (d) =>
  d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// --- CHILD COMPONENTS ---

const CustomCheckbox = ({ checked, onChange, label }) => (
  <label className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer text-sm font-normal w-full">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <div
      className={`w-4 h-4 rounded-sm flex items-center justify-center border-2 transition-colors ${
        checked ? "bg-gray-800 border-gray-800" : "bg-white border-gray-400"
      }`}
    >
      {checked && <FiCheck className="w-3 h-3 text-white" strokeWidth={3} />}
    </div>
    <span className="ml-3 text-gray-800">{label}</span>
  </label>
);
const CustomDropdown = ({ buttonContent, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-[41px] px-3.5 border border-gray-300 rounded-lg bg-white text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        {buttonContent}
        <FiChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-full min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-md z-50 p-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

// --- NEW DATE PICKER COMPONENT ---
const DatePicker = ({ currentDate, onDateSelect, onClose }) => {
  const [displayDate, setDisplayDate] = useState(new Date(currentDate));
  const monthGrid = useMemo(() => getMonthGrid(displayDate), [displayDate]);

  const handleMonthChange = (direction) => {
    setDisplayDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-800">
          {displayDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleMonthChange(-1)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleMonthChange(1)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-gray-500">
        {WEEK_DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2 mt-2">
        {monthGrid.map((day, idx) => {
          const isSelected = isSameDay(day.date, currentDate);
          const buttonClasses = `w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
            !day.isCurrentMonth
              ? "text-gray-300"
              : isSelected
              ? "bg-gray-800 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`;
          return (
            <div key={idx} className="flex justify-center">
              <button
                onClick={() => {
                  onDateSelect(day.date);
                  onClose();
                }}
                className={buttonClasses}
              >
                {day.day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// UPDATED: CalendarHeader now includes the DatePicker
const CalendarHeader = ({
  currentDate,
  setCurrentDate,
  viewMode,
  setViewMode,
  users,
  handleUserToggle,
  handlePrint,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const datePickerRef = useRef(null);
  const navigateDate = useCallback(
    (dir) => {
      setCurrentDate((p) => {
        const n = new Date(p);
        if (viewMode === "Day") n.setDate(n.getDate() + dir);
        else if (viewMode === "Week") n.setDate(n.getDate() + dir * 7);
        else n.setMonth(n.getMonth() + dir);
        return n;
      });
    },
    [setCurrentDate, viewMode]
  );
  const selectedUserName =
    users.find((u) => u.checked)?.name || "No user selected";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 bg-white border-b border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative" ref={datePickerRef}>
            <button onClick={() => setIsDatePickerOpen((p) => !p)}>
              <h1 className="text-xl font-bold text-gray-800">
                {formatHeaderDate(currentDate)}
              </h1>
            </button>
            {isDatePickerOpen && (
              <DatePicker
                currentDate={currentDate}
                onDateSelect={setCurrentDate}
                onClose={() => setIsDatePickerOpen(false)}
              />
            )}
          </div>
          <button
            onClick={() => navigateDate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => navigateDate(1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiChevronRight />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <CustomDropdown
            className="w-40"
            buttonContent={
              <div className="flex items-center gap-2">
                <FiHome className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-sm">Personal</span>
              </div>
            }
          >
            <div className="p-2 text-sm text-gray-500">
              More calendars soon!
            </div>
          </CustomDropdown>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 h-[41px] px-4 bg-[#081722] text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Add New Event
          </button>
          <AddNewEventModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Search events..."
            className="w-full h-[41px] pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        <CustomDropdown
          className="w-full sm:w-auto md:w-56"
          buttonContent={
            <span className="text-sm text-gray-800">{selectedUserName}</span>
          }
        >
          {users.map((u) => (
            <CustomCheckbox
              key={u.id}
              label={u.name}
              checked={u.checked}
              onChange={() => handleUserToggle(u.id)}
            />
          ))}
        </CustomDropdown>
        <CustomDropdown
          className="w-full sm:w-auto md:w-32"
          buttonContent={
            <span className="text-sm text-gray-800">{viewMode}</span>
          }
        >
          {VIEW_MODES.map((m) => (
            <CustomCheckbox
              key={m}
              label={m}
              checked={viewMode === m}
              onChange={() => setViewMode(m)}
            />
          ))}
        </CustomDropdown>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 h-[41px] px-4 border border-gray-300 rounded-lg text-sm text-gray-800 hover:bg-gray-100 whitespace-nowrap transition-colors"
        >
          <FiPrinter className="w-4 h-4" />
          Print my diary
        </button>
      </div>
    </div>
  );
};

// --- Calendar View Components (Week, Day, Month) ---
const WeekView = ({
  weekDates,
  getEventsForSlot,
  currentDate,
  onEventSelect,
  setCurrentDate,
  setViewMode,
  isLoading,
}) => {
  
  const EventCard = ({ event, onClick }) => {

    const style = EVENT_STYLES[event.type];
    const borderClass = style.dashed
      ? "border-2 border-dashed"
      : "border border-l-4";
    const borderStyle = style.dashed
      ? { borderColor: style.color }
      : { borderLeftColor: style.color, borderColor: "#E2E8F0" };
    return (
      <div
        onClick={onClick}
        className={`absolute bg-white rounded-lg p-2.5 text-[#081722] cursor-pointer hover:shadow-md hover:z-20 transition-all duration-200 ${borderClass}`}
        style={{
          ...borderStyle,
          backgroundColor: style.bgColor,
          left: "0.5rem",
          right: "0.5rem",
          top: "0.5rem",
          minHeight: "120px",
          zIndex: 10, // Ensure the card is above the grid
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <style.icon
            className="w-4 h-4 shrink-0"
            style={{ color: style.color }}
          />
          <span
            className="font-semibold text-xs"
            style={{ color: style.color }}
          >
            {event.type}
          </span>
        </div>
        <h3 className="font-semibold text-sm leading-tight mb-2">
          {event.title}
        </h3>
        <div className="text-xs text-gray-500 space-y-1">
          <p className="font-medium">{event.time}</p>
          {event.location && <p className="truncate">{event.location}</p>}
          {event.eventNotes && (
            <p className="truncate text-gray-600">{event.eventNotes}</p>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px]">
        <div
          className="grid"
          style={{ gridTemplateColumns: "6rem repeat(7, 1fr)" }}
        >
          <div className="sticky top-0 bg-white text-sm font-semibold text-gray-500 p-3 text-left border-b border-r border-[#E5E7EB] z-10">
            Time
          </div>
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`sticky top-0 p-3 text-center border-b border-r border-[#E5E7EB] z-10 ${
                isSameDay(date, new Date()) ? "bg-blue-50" : "bg-white"
              }`}
            >
              <button
                onClick={() => {
                  setCurrentDate(date);
                  setViewMode("Day");
                }}
                className="flex flex-col items-center justify-center w-full rounded-lg p-1 hover:bg-gray-100 transition-colors"
              >
                <div className="text-xs text-gray-500 uppercase">
                  {CALENDAR_WEEK_DAYS[index]}
                </div>
                <div
                  className={`text-lg font-bold mt-1 ${
                    isSameDay(date, currentDate)
                      ? "text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center"
                      : "text-gray-700"
                  }`}
                >
                  {date.getDate()}
                </div>
              </button>
            </div>
          ))}
          {TIME_SLOTS.map((t) => (
            <React.Fragment key={t}>
              <div className="bg-white text-sm font-semibold text-gray-500 p-3 text-left border-r border-b border-[#E5E7EB] sticky left-0 z-[5]">
                {t}
              </div>
              {weekDates.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  className="min-h-[150px] relative border-r border-b border-[#E5E7EB] bg-white hover:bg-gray-50/50 transition-colors"
                >
                  {getEventsForSlot(day, t).map((e) => (
                    <EventCard
                      key={e.id}
                      event={e}
                      onClick={() => onEventSelect(e)}
                    />
                  ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
const DayView = ({ currentDate, events, onEventSelect }) => {
  const dayEvents = useMemo(
    () =>
      events
        .filter((e) => isSameDay(e.date, currentDate))
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [currentDate, events]
  );
  return (
    <div className="p-6">
      <div className="space-y-4">
        {dayEvents.length > 0 ? (
          dayEvents.map((event) => {
            const style = EVENT_STYLES[event.type];
            const Icon = style.icon;
            return (
              <div
                key={event.id}
                onClick={() => onEventSelect(event)}
                className={`flex gap-4 p-4 border rounded-lg cursor-pointer`}
                style={{
                  borderColor: style.color,
                  backgroundColor: style.bgColor,
                }}
              >
                <div className="w-24 text-sm font-medium text-gray-600">
                  {event.time}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon
                      className="w-4 h-4 shrink-0"
                      style={{ color: style.color }}
                    />
                    <span className="font-semibold text-sm">{event.title}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <FiMapPin className="w-4 h-4 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-10">
            No events scheduled for today.
          </div>
        )}
      </div>
    </div>
  );
};
const MonthView = ({
  currentDate,
  events,
  onEventSelect,
  setCurrentDate,
  setViewMode,
}) => {
  const monthGrid = useMemo(() => getMonthGrid(currentDate), [currentDate]);
  const eventsByDate = useMemo(() => {
    const map = new Map();
    events.forEach((e) => {
      const dateStr = e.date.toDateString();
      if (!map.has(dateStr)) map.set(dateStr, []);
      map.get(dateStr).push(e);
    });
    return map;
  }, [events]);
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        <div className="grid grid-cols-7 border-t border-l border-gray-200">
          {CALENDAR_WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-gray-500 bg-gray-50 border-r border-b border-gray-200"
            >
              {day}
            </div>
          ))}
          {monthGrid.map((day, idx) => {
            const dayEvents = eventsByDate.get(day.date.toDateString()) || [];
            const isToday = isSameDay(day.date, new Date());
            const isSelected = isSameDay(day.date, currentDate);
            let dayClass =
              "text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full";
            if (isSelected) dayClass += " text-white bg-blue-600";
            else if (isToday) dayClass += " text-blue-600";
            else if (day.isCurrentMonth) dayClass += " text-gray-800";
            else dayClass += " text-gray-400";
            return (
              <div
                key={idx}
                onClick={() => {
                  setCurrentDate(day.date);
                  setViewMode("Day");
                }}
                className={`h-36 p-2 border-r border-b border-gray-200 cursor-pointer transition-colors ${
                  day.isCurrentMonth
                    ? "bg-white hover:bg-gray-50"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className={dayClass}>{day.day}</div>
                <div className="mt-1 space-y-1 overflow-y-auto max-h-24">
                  {dayEvents.map((event) => {
                    const style = EVENT_STYLES[event.type];
                    return (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventSelect(event);
                        }}
                        className="text-xs p-1 rounded-md truncate"
                        style={{
                          backgroundColor: style.bgColor,
                          color: style.color,
                        }}
                      >
                        <div className="font-semibold">{event.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const SelectedEvent = ({ event, onClose, onDelete, isDeleting }) => {
  const [activeTab, setActiveTab] = useState("Event Notes");
  if (!event) return null;
  const style = EVENT_STYLES[event.type];
  const user = initialUsers.find((u) => u.name === event.user) || {
    name: "Unknown",
    role: "Unknown",
  };
  const Icon = style.icon;
  const tabs = ["Event Notes", "Follow-Up Notes", "Extra Contacts"];
  const renderTabContent = () => {
    switch (activeTab) {
      case "Event Notes":
        return event.eventNotes || "No event notes available.";
      case "Follow-Up Notes":
        return event.followUpNotes || "No follow-up notes available.";
      case "Extra Contacts":
        return Array.isArray(event.extraContacts)
          ? event.extraContacts.join(", ")
          : "No extra contacts available.";
      default:
        return null;
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-[#081722] mb-4">
        Selected Event
      </h2>
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <FiX className="w-5 h-5" />
        </button>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <Icon className="w-6 h-6 text-[#081722]" />
            <h3 className="text-xl font-semibold text-[#081722]">
              {event.title}
            </h3>
          </div>
          <div
            className="px-4 py-1.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: style.badgeColor, color: style.color }}
          >
            {event.type}
          </div>
        </div>
        <div className="flex items-center gap-8 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 h-4" />
            <span>
              {event.date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <FiMapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex gap-6 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-[#081722] text-[#081722]"
                    : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[80px] text-sm text-gray-700 mb-6">
          {renderTabContent()}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FiUser className="w-8 h-8 p-1.5 bg-gray-200 rounded-full" />
            <div>
              <div className="text-sm font-semibold text-[#081722]">
                {user.name}
              </div>
              <div className="text-xs text-gray-500">{user.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 text-sm font-medium bg-[#00AC4F]/10 text-[#00AC4F] rounded-lg hover:bg-[#00AC4F]/20">
              Confirm
            </button>
            <button className="px-5 py-2 text-sm font-medium bg-[#6B7280]/10 text-[#6B7280] rounded-lg hover:bg-[#6B7280]/20">
              Unconfirm
            </button>
            <button
              onClick={() => onDelete(event._id)}
              disabled={isDeleting}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition ${
                isDeleting
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#F50408]/10 text-[#F50408] hover:bg-[#F50408]/20"
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CALENDAR COMPONENT ---
const CalendarView = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [users, setUsers] = useState(initialUsers);
  const [viewMode, setViewMode] = useState("Week");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get events from Redux store
  const events = useSelector(selectEvents);
  
  const isLoading = useSelector(selectIsLoadingEvents);

  // Fetch events when date range changes
  const fetchEventsForRange = useCallback(
    (startDate, endDate) => {
      // Format dates in UTC directly
      const start = format(startDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      const end = format(endDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");

      dispatch(getEventRange({ start, end }));
    },
    [dispatch]
  );

  // Get date range based on view mode
  useEffect(() => {
    let startDate, endDate;

    switch (viewMode) {
      case "Day":
        startDate = new Date(currentDate.setHours(0, 0, 0, 0));
        endDate = new Date(currentDate.setHours(23, 59, 59, 999));
        break;
      case "Week":
        const weekDates = getWeekDates(currentDate);
        startDate = new Date(weekDates[0].setHours(0, 0, 0, 0));
        endDate = new Date(weekDates[6].setHours(23, 59, 59, 999));
        break;
      case "Month":
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
          23,
          59,
          59,
          999
        );
        break;
    }

    fetchEventsForRange(startDate, endDate);
  }, [currentDate, viewMode, fetchEventsForRange]);

  const formattedEvents = useMemo(() => {
   
    const mapped = events.map((event) => {
      // Parse the UTC dates and convert to local time
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);

      // Format the dates in local time
      const formatted = {
        id: event._id,
        title: event.title,
        type: event.entryType.toUpperCase(),
        date: startDate,
        startTime: startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        endTime: endDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        time: `${startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })} - ${endDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}`,
        location: event.address,
        user: "Alex Thompson (You)", // Default to current user since we don't have agent name mapping yet
        eventNotes: event.notes,
        followUpNotes: event.followUpNotes,
        extraContacts:
          event.participants?.map((p) => `${p.name} - ${p.role}`) || [],
        allDay: event.allDay,
        status: event.status,
      };
  
      return formatted;
    });
    
    return mapped;
  }, [events]);

  const filteredEvents = useMemo(() => {
    const checkedUserNames = users.filter((u) => u.checked).map((u) => u.name);
    
    const filtered =
      checkedUserNames.length === 0
        ? []
        : formattedEvents.filter((e) => checkedUserNames.includes(e.user));
    
    return filtered;
  }, [users, formattedEvents]);
  const handleUserToggle = useCallback(
    (userId) =>
      setUsers((p) =>
        p.map((u) => (u.id === userId ? { ...u, checked: !u.checked } : u))
      ),
    []
  );
  const handlePrint = useCallback(() => window.print(), []);
  const getEventsForSlot = useCallback(
    (dayDate, timeSlot) => {
      const slotEvents = filteredEvents.filter((e) => {
        // Check if event is on the same day
        const sameDay = isSameDay(e.date, dayDate);

        // Convert timeSlot to hour for comparison (e.g., "09:00" -> 9)
        const slotHour = parseInt(timeSlot.split(":")[0], 10);
        const eventHour = parseInt(e.startTime.split(":")[0], 10);

        // Event starts in this time slot
        const matchesSlot = eventHour === slotHour;

        return sameDay && matchesSlot;
      });

      // console.log("Events for slot:", {
      //   dayDate: dayDate.toISOString(),
      //   timeSlot,
      //   eventCount: slotEvents.length,
      //   events: slotEvents,
      // });

      return slotEvents;
    },
    [filteredEvents]
  );
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const renderView = () => {
    const props = {
      currentDate,
      events: filteredEvents,
      onEventSelect: handleEventSelect,
      setCurrentDate,
      setViewMode,
      isLoading,
    };

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
      );
    }

    switch (viewMode) {
      case "Day":
        return <DayView {...props} />;
      case "Month":
        return <MonthView {...props} />;
      case "Week":
      default:
        return (
          <WeekView
            {...props}
            weekDates={getWeekDates(currentDate)}
            getEventsForSlot={getEventsForSlot}
          />
        );
    }
  };
  const isDeleting = useSelector(selectIsDeletingEvent);
  const handleDelete = async (eventId) => {
  const result = await Swal.fire({
    title: "Delete this event?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6B7280",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    await dispatch(deleteEvent(eventId)).unwrap();
    setSelectedEvent(null); // close detail view
    Swal.fire({
      title: "Deleted!",
      text: "The event has been deleted successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Failed to delete event:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to delete event. Please try again.",
      icon: "error",
      confirmButtonColor: "#d33",
    });
  }
};

  return (
    <div className="bg-[#FCFCFC] rounded-xl border border-[#E2E8F0] font-sans overflow-hidden">
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        viewMode={viewMode}
        setViewMode={setViewMode}
        users={users}
        handleUserToggle={handleUserToggle}
        handlePrint={handlePrint}
      />
      {renderView()}
      {selectedEvent && (
        <SelectedEvent
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onDelete={() => handleDelete(selectedEvent.id)} // ✅ FIXED
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default CalendarView;


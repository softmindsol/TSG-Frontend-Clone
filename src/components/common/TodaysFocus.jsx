import React, { useEffect } from "react";
import ScheduleItem from "./ScheduleItem";
import ClientProgress from "./ClientProgress";
import {
  FiCalendar,
  FiCheckSquare,
  FiHome,
  FiPhone,
  FiUsers,
} from "react-icons/fi";
import {
  FaClipboardList,
  FaEye,
  FaPhoneAlt,
  FaUsers as FaUsersAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingToday,
  selectTodayEvents,
} from "../../store/features/event/slice";
import {
  deleteEvent,
  getTodayEvents,
  markEventCompleted,
  revertEventToScheduled,
} from "../../store/features/event/service";
import { selectAllClients } from "../../store/selector";
import { getAllClients } from "../../store/features/client/service";
import { Link } from "react-router-dom";

const TodaysFocus = () => {
  const dispatch = useDispatch();

  // Events (Today's Schedule)
  const events = useSelector(selectTodayEvents);
  const loading = useSelector(selectIsLoadingToday);

  useEffect(() => {
    dispatch(getTodayEvents());
    dispatch(getAllClients());
  }, [dispatch]);

  // Clients
  const {
    data: allClientsData,
    isLoading: allClientsLoading,
    errorMessage: allClientsError,
  } = useSelector(selectAllClients);

  // ✅ Normalize client data into an array safely
  const clientsArray = Array.isArray(allClientsData)
    ? allClientsData
    : allClientsData?.clients || allClientsData?.data || [];

  console.log("🚀 ~ TodaysFocus ~ events:", events);
  console.log("🚀 ~ TodaysFocus ~ clientsArray:", clientsArray);

  // Icon color maps
  const iconMap = {
    meeting: <FiCalendar className="text-green-600 w-4 h-4" />,
    call: <FiPhone className="text-blue-600 w-4 h-4" />,
    viewing: <FiHome className="text-amber-500 w-4 h-4" />,
    review: <FiCheckSquare className="text-purple-600 w-4 h-4" />,
    other: <FiCalendar className="text-gray-400 w-4 h-4" />,
  };

  const bgMap = {
    meeting: "bg-green-100",
    call: "bg-blue-100",
    viewing: "bg-amber-100",
    review: "bg-purple-100",
    other: "bg-gray-100",
  };

  return (
    <div>
      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4 font-poppins">
        Today's Focus
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8">
        {/* 🗓️ Today's Schedule Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-poppins flex items-center gap-2">
            <FiCalendar color="#00AC4F" size={18} />
            <span>Today's Schedule</span>
          </h3>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {loading ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Loading events...
              </p>
            ) : events.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No events scheduled for today.
              </p>
            ) : (
              events.map((event) => {
                const startTime = new Date(event.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <ScheduleItem
                    key={event._id}
                    time={startTime}
                    title={event.title}
                    entryType={event.entryType}
                    completed={event.status === "completed"}
                    icon={
                      iconMap[event.entryType?.toLowerCase()] || iconMap.other
                    }
                    iconBg={
                      bgMap[event.entryType?.toLowerCase()] || bgMap.other
                    }
                    onDelete={() => dispatch(deleteEvent(event._id))}
                    onToggleComplete={() =>
                      dispatch(
                        event.status === "completed"
                          ? revertEventToScheduled(event._id)
                          : markEventCompleted(event._id)
                      )
                    }
                  />
                );
              })
            )}
          </div>
        </div>

        {/* 👥 Current Clients Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-poppins flex items-center gap-2">
              <FiUsers color="#1877F2" size={18} />
              <span>Current Clients</span>
            </h3>

            <Link
              to="/agent/clients"
              className="text-sm font-medium text-gray-800 underline font-poppins"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {allClientsLoading ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Loading clients...
              </p>
            ) : clientsArray.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No clients found.
              </p>
            ) : (
              clientsArray.map((client) => (
                <ClientProgress
                  key={client._id || client.clientName}
                  avatar={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    client.clientName || "Client"
                  )}&background=random`}
                  name={client.clientName}
                  status={client.amlStatus || "Active"}
                  progress={client?.averageDealPercentage}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysFocus;

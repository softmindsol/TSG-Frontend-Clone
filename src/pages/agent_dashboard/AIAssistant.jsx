import React, { useEffect, useState } from "react";
import images from "../../assets/images";
import Icons from "../../assets/icons/Icons";
import CustomHeading from "../../components/common/Heading";
import SelectInput from "../../components/common/SelectInput";
import { purchaseMethodOptions } from "../../constant/option";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleClients } from "../../store/features/client/service";
import {
  startSession,
  sendMessage,
  getChatHistory,
  getChatById,
  deleteSession,
} from "../../store/features/aiAssistant/service";
import { clearChat } from "../../store/features/aiAssistant/slice";
import { toast } from "sonner";

const AIAssistant = () => {
  const dispatch = useDispatch();
  const allClients = useSelector((state) => state.client.simpleClients);
  

  const [inputMessage, setInputMessage] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const clientOptions =
    allClients?.data?.clients?.map((client) => ({
      value: client._id,
      label: client.clientName,
    })) || [];

  // Find label for current ID
  const selectedLabel =
    clientOptions.find((opt) => opt.value === selectedClient)?.label || "";

  const [chatTitle, setChatTitle] = useState("");

  // Get state from Redux
  const { activeSession, messages, sessions, aiTyping } = useSelector(
    (state) => state.aiAssistant
  );

  useEffect(() => {
    dispatch(getSimpleClients());
    dispatch(getChatHistory());
  }, [dispatch]);

  // Handle starting a new chat session
  const handleStartSession = async () => {
    if (!chatTitle.trim()) {
      toast.error("Please enter a chat title");
      return;
    }

    try {
      await dispatch(
        startSession({
          title: chatTitle,
          clientId: selectedClient || undefined,
        })
      ).unwrap();
      dispatch(getChatHistory());

      setChatTitle("");
      setChatScreen(true);
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      return;
    }

    // if (!activeSession?._id) {
    //   toast.error("Please start a chat session first");
    //   return;
    // }

    try {
      await dispatch(
        sendMessage({
          sessionId: activeSession._id || activeSession,
          clientId: selectedClient,
          message: inputMessage,
        })
      ).unwrap();

      setInputMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Load a specific chat session
  const handleLoadChat = async (sessionId) => {
    try {
      const result = await dispatch(getChatById(sessionId)).unwrap();
      console.log("🚀 ~ handleLoadChat ~ result:", result);
      // Set active session to the loaded chat
      if (result?.session) {
        setChatScreen(true);
        // If there's a client linked to this session, select it
        if (result.session.clientId) {
          setSelectedClient(result.session.clientId);
        }
      }
    } catch (error) {
      console.error("Failed to load chat:", error);
      toast.error("Failed to load chat session");
    }
  };

  // Clear current chat
  const handleClearChat = () => {
    dispatch(clearChat());
  };

  // Handle deleting a chat session
  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation(); // Prevent chat loading when clicking delete
    try {
      await dispatch(deleteSession(sessionId)).unwrap();
      if (activeSession?._id === sessionId) {
        dispatch(clearChat());
        setChatScreen(false);
      }
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };
  const [chatScreen, setChatScreen] = useState(false);
  return (
    <>
      {!chatScreen ? (
        <div className="bg-white border border-[#E2E8F0] rounded-md p-3 2xl:pb-32 mt-20">
          <div className="flex flex-col items-center justify-center">
            <img src={images.logo_light} className="w-[248px]" alt="Logo" />{" "}
            <p className="text-base font-medium text-[#6B7280]">
              Link a client, fire off a polished email, and let AI handle the
              busywork
            </p>
          </div>
          <div className=" flex items-center justify-center mt-10">
            <div className="bg-[#6B7280]/6 p-4 rounded-2xl w-[915px]">
              <div className="flex items-center gap-1.5">
                <Icons.MessageIcon size={22} />
                <CustomHeading
                  heading="Ask Saxon (AI Assistant)"
                  fontSize="text-[18px]"
                  textAlign="text-left"
                  fontWeight="font-[500]"
                />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-[6fr_1fr] gap-1 mt-6">
                <div className="border border-[#D1D5DB] rounded-lg flex items-center pr-[1px] justify-between">
                  <input
                    type="text"
                    value={chatTitle}
                    onChange={(e) => setChatTitle(e.target.value)}
                    placeholder="Enter chat title to start a new conversation"
                    className="border-0 placeholder:text-sm w-full outline-0  pl-4 py-2"
                  />
                  <button
                    onClick={handleStartSession}
                    className="bg-[#081722] cursor-pointer w-32 text-white text-base py-[6px] px-3 rounded-md"
                  >
                    Start Chat
                  </button>
                </div>
                <SelectInput
                  placeholder="Select a Client"
                  value={selectedClient}
                  onChange={setSelectedClient} // ⬅️ no e.target.value
                  options={(allClients?.data?.clients || []).map((c) => ({
                    value: c._id,
                    label: c.clientName,
                  }))}
                />
              </div>
              <div className="text-center">
                <button
                  onClick={() => setChatScreen(!chatScreen)}
                  className="bg-[#ff725c] cursor-pointer w-fit text-white text-sm py-[6px] px-3 rounded-md mt-2"
                >
                  Previous Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[4fr_1fr] rounded-lg p-4 bg-white">
            {/* Main Chat Area */}
            <div className="flex-1 h-[70vh] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 chat-scroll-container">
                {messages && messages.length > 0 ? (
                  <>
                    {messages.map((message, index) => (
                      <div key={index} className="flex items-start gap-4">
                        {message.role === "user" ? (
                          // 👤 User Message
                          <>
                            <div className="w-10 h-10 flex-shrink-0"></div>
                            <div className="bg-[#081722] text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl ml-auto">
                              <p className="text-sm leading-relaxed">
                                {message.content}
                              </p>
                            </div>
                          </>
                        ) : (
                          // 🤖 AI Message
                          <>
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                              TSG
                            </div>
                            <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl">
                              <p className="text-gray-800 text-sm leading-relaxed">
                                {message.content}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    {/* 💭 Typing Effect — appears after the last user message */}
                    {aiTyping && (
                      <div className="flex items-start gap-4 mt-2">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-medium">
                          TSGs
                        </div>
                        <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs flex items-center">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-gray-500 italic mt-10">
                    No messages found
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="bg-white border rounded-lg border-gray-200 flex flex-col">
              {/* New Chat Button */}
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  value={chatTitle}
                  onChange={(e) => setChatTitle(e.target.value)}
                  placeholder="Enter chat title"
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={handleStartSession}
                  className="w-full bg-[#081722] hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <span className="text-lg">+</span>
                  New Chat
                </button>
              </div>

              {/* Previous Chats Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Previous Chats</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 cursor-pointer">
                      <Icons.SearchIcon size={24} />
                    </span>
                    <span className="text-gray-500 cursor-pointer">
                      <Icons.SideBar size={25} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Previous Chats List */}
              <div className="flex-1 overflow-y-auto">
                {sessions.map((chat) => (
                  <div
                    key={chat._id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      activeSession?._id || activeSession === chat._id
                        ? "bg-gray-300"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => handleLoadChat(chat._id)}
                      >
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {chat.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {new Date(chat.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteSession(e, chat._id)}
                        className="text-gray-500 hover:text-red-500 p-1 transition-colors"
                      >
                        <Icons.DeleteIcon size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[5fr_1fr] gap-1 mt-6 p-6 border border-[#E2E8F0] rounded-lg bg-white">
            <div className="border border-[#D1D5DB] rounded-lg flex items-center pr-[1px] justify-between">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="@ mention client and ask anything"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={aiTyping} // Remove the activeSession check since we want to allow messaging in loaded sessions
                className="border-0 placeholder:text-sm outline-0 w-full pl-4 py-2"
              />
              <button
                onClick={handleSendMessage}
                disabled={aiTyping || !inputMessage.trim()}
                className="bg-[#081722] cursor-pointer text-white text-base py-[6px] px-3 rounded-md disabled:bg-gray-400"
              >
                Ask
              </button>
            </div>
            <SelectInput
              placeholder="Link Client"
              value={selectedLabel} // 👈 show name
              onChange={setSelectedClient} // ⬅️ no e.target.value
              options={
                allClients?.data?.clients?.map((client) => ({
                  value: client._id,
                  label: client.clientName,
                })) || []
              }
            />
          </div>
        </>
      )}
    </>
  );
};

export default AIAssistant;

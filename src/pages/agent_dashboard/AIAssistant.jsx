import React, { useState } from "react";
import images from "../../assets/images";
import Icons from "../../assets/icons/Icons";
import CustomHeading from "../../components/common/Heading";
import SelectInput from "../../components/common/SelectInput";
import { purchaseMethodOptions } from "../../constant/option";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "It seems like there might be a typo or error in your message. Could you clarify or provide more details?",
    },
    {
      id: 2,
      type: "user",
      content:
        "The final product not only met the client's new requirements but also exceeded user expect-ations by being more inclusive. This experience reinforced the importance of adaptability and early stakeholder engagement in design projects.",
    },
    {
      id: 3,
      type: "ai",
      content:
        "It seems like there might be a typo or error in your message. Could you clarify or provide more details?",
    },
    {
      id: 4,
      type: "user",
      content:
        "The final product not only met the client's new requirements but also exceeded user expect-ations by being more inclusive. This experience reinforced the importance of adaptability and early stakeholder engagement in design projects.",
    },
    {
      id: 5,
      type: "ai",
      content:
        "It seems like there might be a typo or error in your message. Could you clarify or provide more details?",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const previousChats = [
    {
      id: 1,
      title: "Sarah Wilson Reminder",
      subtitle:
        "Contract Management Rules Lorem ipsum is the most well known filler text and comes...",
    },
    {
      id: 2,
      title: "List of Sites",
      subtitle:
        "Contract Management Rules Lorem ipsum is the most well known filler text and comes...",
    },
    {
      id: 3,
      title: "John Smith Details",
      subtitle:
        "Contract Management Rules Lorem ipsum is the most well known filler text and comes...",
    },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        content: inputMessage,
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
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
                    placeholder="@ mention client and ask anything"
                    className="border-0 placeholder:text-sm outline-0 w-full pl-4 py-2"
                  />
                  <button
                    onClick={() => setChatScreen(true)}
                    className="bg-[#081722] cursor-pointer text-white text-base py-[6px] px-3 rounded-md"
                  >
                    Ask
                  </button>
                </div>
                <SelectInput
                  placeholder="Link Client"
                  options={purchaseMethodOptions}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[4fr_1fr] rounded-lg p-4 bg-white ">
            {/* Main Chat Area */}
            <div className="flex-1 h-[70vh] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-4">
                    {message.type === "user" ? (
                      <>
                        {/* User Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                          TSG
                        </div>
                        {/* User Message */}
                        <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl">
                          <p className="text-gray-800 text-sm leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 flex-shrink-0"></div>
                        {/* AI Message */}
                        <div className="bg-[#081722] text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl ml-auto">
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className=" bg-white border rounded-lg border-gray-200 flex flex-col">
              {/* New Query Button */}
              <div className="p-4 border-b border-gray-200">
                <button className="w-full bg-[#081722] hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <span className="text-lg">+</span>
                  New Query
                </button>
              </div>

              {/* Previous Chats Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Previous Chats</h3>
                  <div className="flex items-center gap-2">
                    <span className=" text-gray-500 cursor-pointer">
                      <Icons.SearchIcon size={24} />
                    </span>
                    <span className=" text-gray-500 cursor-pointer">
                      <Icons.SideBar size={25} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Previous Chats List */}
              <div className="flex-1 overflow-y-auto">
                {previousChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {chat.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {chat.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[6fr_1fr] gap-1 mt-6 p-6 border border-[#E2E8F0] rounded-lg bg-white">
            <div className="border border-[#D1D5DB] rounded-lg flex items-center pr-[1px] justify-between">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="@ mention client and ask anything"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="border-0 placeholder:text-sm outline-0 w-full pl-4 py-2"
              />
              <button
                onClick={() => setChatScreen(true)}
                className="bg-[#081722] cursor-pointer text-white text-base py-[6px] px-3 rounded-md"
              >
                Ask
              </button>
            </div>
            <SelectInput
              placeholder="Link Client"
              options={purchaseMethodOptions}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AIAssistant;

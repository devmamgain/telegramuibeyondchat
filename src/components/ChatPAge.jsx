import axios from "axios";
import { useEffect, useRef, useState } from "react";
import telegrambg from "../assets/telegrambg.jpg";

const ChatPage = ({ idget }) => {
  const [chatdata, setChatData] = useState([]);
  const latestMessageRef = useRef(null);

  useEffect(() => {
    const gettinchat = async () => {
      const chatdata = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${idget}`);
      setChatData(chatdata.data);
    };
    gettinchat();
  }, [idget]);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView();
    }
  }, [chatdata]);

  const gettintime = (timestamp) => {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString('en-US', { hour12: false });
    return time;
  };

  const renderMessage = (message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        const truncatedUrl = part.slice(0, 20);
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {truncatedUrl}...
          </a>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-telesmall-bg dark:bg-teleblack-bg">
      <div className="flex-grow overflow-y-auto mb-10 no-scrollbar">
        {chatdata.data?.map((alldata, index) => (
          <div key={index} className="p-2">
            {alldata.sender_id !== 1 ? (
              <div className="max-w-60 inline-block rounded-2xl bg-white dark:bg-[#252D39] p-2">
                <h1>{alldata.message}</h1>
                <span className="text-[10px]">{gettintime(alldata.updated_at).slice(0, 5)}</span>
              </div>
            ) : (
              <div className="flex ml-auto max-w-60 rounded-2xl bg-white dark:bg-[#252D39] p-2">
                <h1>{renderMessage(alldata.message)}</h1>
                <span className="text-[10px] mt-auto">{gettintime(alldata.updated_at).slice(0, 5)}</span>
              </div>
            )}
          </div>
        ))}
        <div ref={latestMessageRef}></div>
      </div>
      <div className="h-10 flex gap-2 fixed z-10 bg-white w-full bottom-0 justify-center items-center p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-[#9D9C9C]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75zM9 9.75h.008v.015H9V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zM15 9.75h.008v.015H15V9.75z"
          />
        </svg>
        <input
          type="text"
          className="outline-none h-8 rounded-2xl flex-grow"
          placeholder="Message"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-[#9D9C9C] mt-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.375 12.739-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 002.112 2.13"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-[#9D9C9C] mt-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChatPage;

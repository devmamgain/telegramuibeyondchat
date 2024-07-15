import axios, { all } from "axios"
import { useEffect, useRef, useState } from "react"
import telegrambg from "../assets/telegrambg.jpg"
const ChatPage =({idget})=>{
  
    const [chatdata,setChatData] = useState([])
    const latestMessageRef = useRef(null);

    useEffect(()=>{
        const gettinchat = async()=>{
            const chatdata= await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${idget}`)
            setChatData(chatdata.data)
        }
        gettinchat()
    },[idget])
    useEffect(() => {
        if (latestMessageRef.current) {
          latestMessageRef.current.scrollIntoView();
        }
      }, [chatdata]);
    console.log(chatdata)
    console.log(idget)

    const gettintime =(timestamp)=>{
        const date = new Date(timestamp);
  const time = date.toLocaleTimeString('en-US', { hour12: false })
  return(time)
    }
    const renderMessage = (message) => {
      // Regular expression to find URLs in the message
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = message.split(urlRegex); // Split message by URLs
  
      return parts.map((part, index) => {
        if (part.match(urlRegex)) {
          const truncatedUrl = part.slice(0, 20); // Adjust the number of characters to show
          return (
            <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {truncatedUrl}...{/* Show ellipsis or other indication */}
            </a>
          );
        } else {
          return <span key={index}>{part}</span>;
        }
      });
    };
    return(
        <div className={`flex flex-col gap-2 min-h-screen bg-telesmall-bg dark:bg-teleblack-bg mb-10`}>
         
        {chatdata.data?.map((alldata,index) =>
             <div key={index} className="p-2 ">
               {alldata.sender_id != 1 ? <div className="max-w-60 inline-block rounded-2xl bg-white dark:bg-[#252D39] p-2">
                 <h1 > {alldata.message} </h1> 
                 <span className="text-[10px] ">{gettintime(alldata.updated_at).slice(0,5)}</span>

                </div> :
                <div className="flex ml-auto max-w-60  rounded-2xl bg-white dark:bg-[#252D39] p-2">
                <h1 >{renderMessage(alldata.message)}</h1> 
                <span className="text-[10px] mt-auto">{gettintime(alldata.updated_at).slice(0,5)}</span>
              </div>
         }
        </div>)}
        <div className="h-10 flex flex-grow gap-2 fixed z-10 bg-white w-full bottom-0 justify-center items-center p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-[#9D9C9C] ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
</svg>
<input type="text" className=" outline-none h-8 rounded-2xl flex-grow" placeholder="Message"/>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-[#9D9C9C] mt-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-[#9D9C9C] mt-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
</svg>

        </div>
        <div ref={latestMessageRef}></div>
        </div>
    )
}

export default ChatPage
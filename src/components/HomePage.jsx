import { createContext, useEffect } from "react"
import NavBar from "./NavBar"
import { useState } from "react"
import axios from "axios"
import ChatPage from "./ChatPAge"
import Categories from "./Categories"
import { useChatConext } from "./ChatContext"



const HomePage =()=>{
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
    const [alluser,setAllUsers] = useState([])
    const {chatid,setChatId} = useChatConext()
    const [lastMessages, setLastMessages] = useState({});
    const [switchingscreen, setSwitchingScreen] = useState(true)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const isWideScreen = screenWidth >= 640;

    useEffect(()=>{
        const datafun = async()=>{
        const gettingapidata = await axios.get("https://devapi.beyondchats.com/api/get_all_chats?page=1")
        const finalgettingapidata = gettingapidata.data
        const messagesPromises = finalgettingapidata.data.data.map(async(data)=>{
            const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${data.id}`);
            const messages = response.data.data.map((message) => message.message); // Extracting messages
            const lastMessage = messages.length > 0 ? messages[messages.length - 1] : "No messages yet";
            return { chatId: data.id, lastMessage };

        })

        const messages = await Promise.all(messagesPromises);
        const lastMessagesMap = messages.reduce((acc, curr) => {
          acc[curr.chatId] = curr.lastMessage;
          return acc; }, {});
          setLastMessages(lastMessagesMap);

        setAllUsers(finalgettingapidata)
        }
        datafun()
        // const gettinchat = async()=>{
        //     const chatdata= await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages`)
        // }
    },[])

    const gettinchatdata = async()=>{

    }
    console.log(alluser)
    const getDayOfWeek = (timestamp) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(timestamp);
        const dayName = daysOfWeek[date.getDay()];
    
        // Return the first three words of the day name
        return dayName.split(' ').slice(0, 3).join(' ');
      };
    return(
      <div className="dark:bg-[#17202A] min-h-screen dark:text-white ">
    <div className="sm:max-w-[640px] sm1:w-[320px] md:w-[425px] sm1:fixed sm1:flex sm1:flex-col sm1:h-screen">
        <div className="fixed top-0 w-full z-10 bg-[#537CA2] dark:bg-[#252D39] sm:max-w-[640px] sm1:w-[320px] md:w-[425px]">
        <NavBar  />
       <div className="pr-8 "><Categories/></div> 
        </div>

        <div className="mt-[90px] z-5 sm1:flex-grow sm1:overflow-y-auto no-scrollbar">

        {(chatid === 0 || isWideScreen) && alluser.data?.data.map((data,index) =>
        <div key={index} className="pt-2 px-2 flex gap-3 hover:bg-[#F0F0F1] dark:hover:bg-[#202A37] hover:cursor-pointer" onClick={()=>setChatId(data.id)}>
    {/* <img src={}/> */}
    <h1 className=" flex rounded-full bg-purple-500 w-12 h-12 justify-center items-center text-white font-semibold text-lg"> {data.creator.name ? data.creator.name.slice(0,1) : "NA"}</h1>
      <div className="flex flex-col flex-grow border-b dark:border-[#151d27] border-[#F1F1F1]">
    <div className="flex">
     <h1 className=" font-semibold" >{data.creator.name ? data.creator.name : "Not Available"} </h1>
     <h1 className="ml-auto text-[#AAAAAB] text-sm font-semibold">{getDayOfWeek(data.creator.updated_at).slice(0,3)}</h1>
    </div>
    <div className="flex pb-2">
    <h1 className="text-[#9D9C9C] text-[15px] font-semibold">{lastMessages[data.id].slice(0,28) + "..." || "No messages yet"}</h1> {/* Display last message */}

     {/* <h1 className="ml-auto bg-blue-300 text-[9px] p-1 rounded-full ">{data.msg_count}</h1> */}
     <h1 className="relative ml-auto">
     <span className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[9px] text-white">{data.msg_count}</span>

     <svg  fill="#32568f" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-6 -6 72.00 72.00" xml:space="preserve" stroke="#32568f">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M30,1.5c-16.542,0-30,12.112-30,27c0,5.205,1.647,10.246,4.768,14.604c-0.591,6.537-2.175,11.39-4.475,13.689 c-0.304,0.304-0.38,0.769-0.188,1.153C0.276,58.289,0.625,58.5,1,58.5c0.046,0,0.093-0.003,0.14-0.01 c0.405-0.057,9.813-1.412,16.617-5.338C21.622,54.711,25.738,55.5,30,55.5c16.542,0,30-12.112,30-27S46.542,1.5,30,1.5z"/> </g>
</svg>
</h1>
</div>
</div>

     </div>) }
    </div>
    </div>
    {chatid !=0 ? <div className="z-0 sm1:ml-[320px] md:ml-[425px] "> <ChatPage idget={chatid}/> </div> : isWideScreen ? <div className={`flex justify-center items-center sm1:ml-[320px] md:ml-[425px] min-h-screen bg-telesmall-bg dark:bg-teleblack-bg`}> <h1 className="dark:bg-[#252D39] rounded-xl bg-white px-4 py-1 w-[50%] text-center"> Select a chat to start messaging </h1> </div> : null}
    </div>
    )
}

export default HomePage
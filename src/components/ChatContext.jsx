import { createContext, useContext, useState } from "react"

const ChatConext = createContext()

const ChatInOffProvider = ({children})=>{
    const [chatid,setChatId] = useState(0)
    return(
        <ChatConext.Provider value ={{chatid,setChatId}}>{children}</ChatConext.Provider>
    )
}

const useChatConext = ()=> useContext(ChatConext)
export {useChatConext,ChatInOffProvider}
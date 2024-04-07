import LeftMenu from "./ChatUI/LeftMenu"
import MidPart from "./ChatUI/midpart/MidPart"
import ChatBlock from "./ChatUI/chatblock/ChatBlock"
import { useState, useEffect } from "react"
import { useActiveStore } from "../store/zustand"


const ChatUI = () => {

  const [icon, setIcon] = useState(0)
  const active = useActiveStore(state => state.active)
  const icons = ['chat', 'setting', 'list', 'database', 'file']

  return (
    <div className="w-[90%] h-[85%] flex flex-row">
        <div className="w-[5%] h-full bg-gradient-to-b from-fuchsia-500 to-violet-500 flex flex-col items-center gap-[8px] pt-[5px]">
            <LeftMenu icons={icons}  icon={icon} setIcon={setIcon}/>
        </div>
        <div className="w-[25%] h-full bg-indigo-400 p-[0.2%]" >
            <MidPart icon={icon}/>
        </div>
        <div className="w-[70%] h-full bg-indigo-200 flex flex-col">
            <ChatBlock key={`chat-${active}`}/>
        </div>
    </div>
  )
}

export default ChatUI
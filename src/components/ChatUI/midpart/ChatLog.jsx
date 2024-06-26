import { useChatStore, useActiveStore } from "../../../store/zustand"

const ChatLog = () => {
  
  const chats = useChatStore(state => state.chats)
  const active = useActiveStore(state => state.active)
  
  const add = useChatStore(state => state.add)
  const activeReplace = useActiveStore(state => state.replace)

  const handleClick = () => {
       add([])
       activeReplace(active + 1) 
  }

  const handleSelect = (index) => {
     console.log("click", index)
     activeReplace(index)
  }

  return (
    <div className="w-full h-full flex flex-col-reverse items-center">
        <button className="w-[80%] h-[5%] bg-lime-300 rounded-2xl px-[1%]"
                onClick={handleClick}>
           Add new chat
        </button>
        <div className="grow flex flex-col self-start w-full">
            {
              chats.map((chat, index) => {
                  if (index == active) {
                    return <div key={index} className="w-full min-h-[8%] max-h-[10%] bg-teal-200  p-[2%] overflow-hidden text-ellipsis" onClick={() => handleSelect(index)}> 
                           { chat?.length > 0 ? chat?.at(0)?.content : "New Chat"}
                            </div >
                  } else {
                    return <div key={index} className="w-full min-h-[8%] max-h-[10%] p-[2%] overflow-hidden text-ellipsis" onClick={() => handleSelect(index)}> 
                           { chat?.length > 0 ? chat?.at(0)?.content : "New Chat"}
                           </div >
                  }
              })
            }

        </div>
    </div>
  )
}

export default ChatLog

// {chats[active]?.length > 0 ? chats[active]?.at(0)?.content : "New Chat"}
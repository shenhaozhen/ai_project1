import Message from "./Message"
import {useState,useEffect, useRef} from "react"
import { useChatStore, useActiveStore, useAIModeStore} from "../../../store/zustand"
import { fetchFromOpenAI, fetchSqlFromOpenAI } from "../../../api/openai_api"

const ChatBlock = ({database}) => {


    const submitURL = new URL('./assets/Submit.png', import.meta.url).href

    const [messages, setMessages] = useState([])
    const buttonRef = useRef(null);

    const chats = useChatStore(state => state.chats)
    const update = useChatStore(state => state.update)


    const active = useActiveStore(state => state.active)

    const mode = useAIModeStore(state => state.AIMode)



    useEffect(() => { 
       setMessages(chats[active])          
    },[])

    useEffect(() => {
        update(messages,active)
    },[messages, active])

    const handleInput = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    const generateUnqiueID = () => {
        const timeStamp = Date.now()
        const random = Math.random();
        const hexadecimalString = random.toString(16)
        return `id_${timeStamp}_${hexadecimalString}`
    }
    

    const handleSumbit = async (e) => {
        e.preventDefault();
        setMessages(messages => [...messages, {role: 'user', content: e.target[0].value}])
        let response = {role: 'loader', content: ''}
        setMessages(messages => [...messages, response])
        // Call API    
        if(mode == 1){
            response = await fetchSqlFromOpenAI(database,e.target[0].value)
        } else {
            response = await fetchFromOpenAI(e.target[0].value) 
        }
        response = response.choices[0].message
        console.log(response)
        setMessages(messages => {
            let temp = [...messages]
            temp[temp.length - 1] = response
            return [...temp]
        })
    }

    return (
        <div className="w-full h-full flex flex-col-reverse justify-start pb-[10px] items-center">
            <div className="w-[90%]">
                <form className="w-full flex flex-row justify-center" onSubmit={handleSumbit}> 
                    <textarea className="w-full rounded-l-2xl resize-none border-none outline-none text-[16px] block leading-loose p-[10px] bg-indigo-100 grow"  
                            rows={1} onInput={handleInput}>
                    </textarea>
                    <button ref={buttonRef} className="w-[5%] bg-indigo-100 rounded-r-2xl pr-[1%]"> <img src={submitURL} alt="submit"></img></button>
                </form>
            </div>
            <div className="flex flex-col w-full grow">
                {messages?.map((message, index) => {
                    return <Message key={index + message.role} role={message.role} content={message.content} index={index} length={messages.length} buttonRef={buttonRef}/>
                })}
            </div>
        </div>
    )
}

export default ChatBlock
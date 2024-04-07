import Message from "./Message"
import {useState,useEffect, useRef} from "react"
import { useChatStore, useActiveStore, useAIModeStore, useDatabaseStore} from "../../../store/zustand"
import { fetchFromOpenAI2 } from "../../../api/openai_api"

const ChatBlock = () => {

    const submitURL = new URL('./assets/Submit.png', import.meta.url).href

    const [messages, setMessages] = useState([])
    const buttonRef = useRef(null);

    const chats = useChatStore(state => state.chats)
    const update = useChatStore(state => state.update)

    const active = useActiveStore(state => state.active)

    const mode = useAIModeStore(state => state.AIMode)

    const database = useDatabaseStore(state => state.database)

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


    // replace if with switch
    const requestFromOpenAI = async (userInput) => {
        let data;
        if(mode == 1){
            let sysMessage = database.schema == "" ? "" : 'Given the following SQL tables, your job is to write queries given a user’s request.\n' + database.schema;
            data = await fetchFromOpenAI2(sysMessage,userInput,{temperature: 0.3, max_tokens: 150, top_p: 1,})
        } else if(mode == 2){
            let sysMessage = "You will be provided with a block of text, and your task is to extract a list of keywords from it."
            data = await fetchFromOpenAI2(sysMessage,userInput,{temperature: 0.7, max_tokens: 150, top_p: 1,})
        } else if(mode == 3){ 
            let sysMessage = "You will be provided with a block of text, and your task is to create a summary from it by using 3 sentences."
            data = await fetchFromOpenAI2(sysMessage,userInput,{temperature: 0.7, max_tokens: 150, top_p: 1,})
        }else {
            data = await fetchFromOpenAI2(userInput,{temperature: 0.7, max_tokens: 150}) 
        } 
        return data
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        setMessages(messages => [...messages, {role: 'user', content: e.target[0].value}])
        let response = {role: 'loader', content: ''}
        setMessages(messages => [...messages, response])
        let userInput = e.target[0].value 
        response = await requestFromOpenAI(userInput)
        response = response.choices[0].message
        console.log(response)
        setMessages(messages => {
            let temp = [...messages]
            temp[temp.length - 1] = response
            return [...temp]
        })
    }

    return (
        <div className="w-full h-full flex flex-col-reverse justify-start pb-[10px] items-center overflow-auto">
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

// Call API    
/*if(mode == 1){
            console.log(database.schema)
            let sysMessage = database.schema == "" ? "" : 'Given the following SQL tables, your job is to write queries given a user’s request.\n' + database.schema;
            response = await fetchFromOpenAI2(sysMessage,e.target[0].value,{temperature: 0.3, max_tokens: 150, top_p: 1,})
        } else if(mode == 2){
            let sysMessage = "You will be provided with a block of text, and your task is to extract a list of keywords from it."
            response = await fetchFromOpenAI2(sysMessage,e.target[0].value,{temperature: 0.7, max_tokens: 150, top_p: 1,})
        } else if(mode == 3){ 
            let sysMessage = "You will be provided with a block of text, and your task is to create a summary from it by using 3 sentences."
            response = await fetchFromOpenAI2(sysMessage,e.target[0].value,{temperature: 0.7, max_tokens: 150, top_p: 1,})
        }else {
            response = await fetchFromOpenAI2(e.target[0].value,{temperature: 0.7, max_tokens: 150}) 
        }*/     
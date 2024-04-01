import user from './assets/user.png'
import ai from './assets/ai.png'
import Loader from '../../loader/Loader'
import {useState, useEffect, useRef} from "react"

const Message = ({role , content, index, length, buttonRef}) => {


  const [latest, setLatest] = useState('')
  const latestRef = useRef('')


  useEffect(() => { 
    if(buttonRef.current){
      buttonRef.current.disabled = true;
    }
    if (role != 'user' && index == length - 1) {
       let tmp = '';
       let idx = 0;
       const intervalID = setInterval(() => {
          if (idx < content.length) {
            tmp += content[idx]
            latestRef.current.innerHTML = tmp
            idx++
          } else {
            clearInterval(intervalID)
            if(buttonRef.current){
              buttonRef.current.disabled = false;
            }
          }
        }, 50)
    }
   }, [])
 

  //loading
  if (role === 'loader') {
    return (
      <div className='flex flex-row-reverse gap-[2%] p-[1%] bg-purple-300'>
        <img className="w-[8%] bg-neutral-100 rounded-[50%] bg-" src={ai} alt="avatar"/>
        <Loader />
      </div>
    )
  }

  //新回答逐字显示

  const imageUrl = role === 'user' ? user : ai
  let messageStyle = role == 'user' ? "flex flex-row gap-[2%] p-[1%] bg-indigo-300" : "flex flex-row-reverse gap-[2%] p-[1%] bg-purple-300"

  let bool = role == 'ai' && index == length - 1

  if (!bool) {
    return (
      <div className={messageStyle}>
        <img className="w-[50px] h-[50px] bg-neutral-100 rounded-[50%] bg-" src={imageUrl} alt="avatar"/>
        <p ref={latestRef}>{content}</p>
      </div> 
    )
  } else {
    return (
      <div className={messageStyle}>
        <img className="w-[50px] h-[50px] bg-neutral-100 rounded-[50%] bg-" src={imageUrl} alt="avatar"/>
        <p ref={latestRef}>{bool? latest : content}</p>
      </div> 
    )
  }
}
export default Message
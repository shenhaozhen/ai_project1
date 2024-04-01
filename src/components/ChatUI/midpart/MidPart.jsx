import AIModes from "./AIModes"
import ChatLog from "./ChatLog"
import Settings from "./Settings"
import { Database } from "./Database"

const MidPart = ({icon}) => {
  return (
    <div className="w-full h-full">
        {
            icon == 0 ? <ChatLog/> : icon == 1 ? <Settings/> : icon == 2 ? <AIModes/> : <Database/>
        }
    </div>
  )
}

export default MidPart
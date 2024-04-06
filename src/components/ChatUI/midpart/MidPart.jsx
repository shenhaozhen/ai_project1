import AIModes from "./AIModes"
import ChatLog from "./ChatLog"
import Settings from "./Settings"
import { Database } from "./Database"
import File from "./File"

const MidPart = ({icon,databaseSchema}) => {
  return (
    <div className="w-full h-full">
        {
            icon == 0 ? <ChatLog/> : icon == 1 ? <Settings/> : icon == 2 ? <AIModes/> : icon == 3 ? <Database databaseSchema={databaseSchema}/> : <File/>
        }
    </div>
  )
}

export default MidPart
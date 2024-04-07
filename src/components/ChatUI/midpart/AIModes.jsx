import { useAIModeStore } from "../../../store/zustand"

const modes =
 [{mode: 0, name: '普通对话'}, {mode: 1, name: '数据库查询'}, {mode: 2, name: '生成关键字'}, {mode: 3, name: '文本摘要' }, {mode: 4, name: '会议报告总结'}]

const AIModes = () => {

  // 0 -普通对话  1-数据库查询 2-生成关键字 3-文本摘要


  const aimode = useAIModeStore((state) => state.AIMode)
  const setmode = useAIModeStore((state) => state.setAIMode)

  const handleClick = (mode) => {
    setmode(mode.mode)
  }

  return (
    <div className="w-full h-full flex-wrap flex flex-row content-start place-content-center">
      {
        modes.map((mode,index) => {
          return (
            <div key={index} className="w-[45%] h-[20%] bg-green-300 m-[2%] flex justify-center items-center hover:bg-emerald-500"
                 onClick={()=>handleClick(mode)}>
              <p>{mode.name}</p>
            </div>
          )
        })
      }

      <div className="mt-[5%]"> current ai mode is : {aimode }</div>
    </div>
  )
}

export default AIModes
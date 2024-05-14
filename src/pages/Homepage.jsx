import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-emerald-200">
        <Link to="/app"><div className="mb-[10px] bg-cyan-300 px-[1rem] py-[5px]">前往ai应用</div></Link>
        <Link to="form/huiyijihua"><div className="mb-[10px] bg-cyan-300 px-[1rem] py-[5px]">前往会议纪要计划</div></Link>
        <Link to="form/huiyijiyao"><div className="mb-[10px] bg-cyan-300 px-[1rem] py-[5px]">前往会议培训纪要</div></Link>
        <Link to="form/market_promotion_1"><div className="mb-[10px] bg-cyan-300 px-[1rem] py-[5px]">前往市场推广</div></Link>
    </div>
  )
}

export default Homepage
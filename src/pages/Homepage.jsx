import { Link } from "react-router-dom";

const Homepage = () => {

  let buttonStyle = `mb-[10px] bg-cyan-300 px-[1rem] py-[5px] w-[15vmax] h-[10vmax] text-center leading-[10vmax]
                     hover:bg-cyan-200 hover:text-stone-600 cursor-pointer border-2 border-black rounded-3xl`; 

  return (
    <div className="w-full h-full flex flex-row items-center justify-center bg-gradient-to-b from-blue-400 to-emerald-200 font-bold text-2xl">
      <div className="flex flex-row w-[40vmax] flex-wrap gap-x-[3vmax]">
        <Link to="/app">
          <div className={buttonStyle}>前往ai应用</div>
        </Link>
        <Link to="form/huiyijihua">
          <div className={buttonStyle}>前往会议纪要计划</div>
        </Link>
        <Link to="form/huiyijiyao">
          <div className={buttonStyle}>前往会议培训纪要</div>
        </Link>
        <Link to="form/market_promotion_1">
          <div className={buttonStyle}>前往市场推广</div>
        </Link>
        <Link to="form/huiyizixun">
          <div className={buttonStyle}>前往市场咨询</div>
        </Link>
        <Link to="form/cehua">
          <div className={buttonStyle}>前往市场策划</div>
        </Link>
      </div>
    </div>
  )
}

export default Homepage
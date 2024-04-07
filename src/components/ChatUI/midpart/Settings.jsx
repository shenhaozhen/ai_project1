import { useSettingStore } from "../../../store/zustand";

const Settings = () => {


  const setSetting = useSettingStore(state => state.setSetting)

  const handleSubmit = (e) => {
    e.preventDefault();
    let target = e.target;
    let settings = {};
    settings[target[0]["name"]] = target[0].value == "" ? null : Number(target[0].value);   
    settings[target[1]["name"]] = target[1].value == "" ? null : Number(target[1].value);
    settings[target[2]["name"]] = target[2].value == "" ? null : Number(target[2].value);  
    setSetting(settings)

  }

  return (
    <div className="w-full h-full">
      <form className="flex flex-col w-[70%] items-center m-auto" onSubmit={handleSubmit}>
        <label>temperature:</label>
        <input className="w-full" type="number" name="temperature" min={0} max={2} step={0.1} />
        <label>max_tokens</label>
        <input className="w-full"type="number" name="max_tokens"  min={0} max={500} step={10}/>
        <label>top_p:</label>
        <input className="w-full" type="number" name="top_p" min={0} max={1} step={0.1} />
        <button className="bg-teal-200 w-[50%] mt-[5%] hover:bg-cyan-300 hover:text-stone-600" type="submit">update</button>
      </form>
    </div>
  )
}

export default Settings
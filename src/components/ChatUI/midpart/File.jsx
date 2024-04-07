import { useState } from "react"
import {useAIModeStore, useFileStore } from "../../../store/zustand";


const File = () => {

  const file = useFileStore(state => state.file)
  const setFile = useFileStore(state => state.setFile)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setFile(content);
    };

    reader.readAsText(file);
  };
 

  const handleSubmitClick = () => {
    console.log(file);
  };

  const handleClearClick = () => {
    setFile("");
  };

  return (
    <div className="w-full h-full flex flex-col pt-[2%]">
      <label htmlFor="file" className="bg-cyan-400 min-w-max w-[50%] h-[8%] flex justify-center items-center rounded-2xl hover:cursor-pointer">Choose a file:</label> 
      <input className="hidden"type="file" id="file" onChange={handleFileChange} />
      <div className="mt-[2%] grow max-h-[80%] overflow-auto">
        <p className="bg-cyan-100 "> {file} </p>
      </div>
      {
        file !== "" && 
        <div className="w-full h-[8%] flex flex-row justify-around items-center">
          <button className=" bg-cyan-400 w-max max-w-[40%] h-full hover:cursor-pointer p-[2%]" onClick={handleSubmitClick}>Send to GPT</button>
          <button className=" bg-red-400 w-max max-w-[40%] h-full hover:cursor-pointer p-[2%]" onClick={handleClearClick}>Clear</button>
        </div>
      }
    </div>
  )
}

export default File
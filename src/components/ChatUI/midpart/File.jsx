import { useState } from "react"


const File = () => {

  const [fileContent, setFileContent] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
    };

    reader.readAsText(file);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <label htmlFor="file" className="bg-cyan-400 min-w-max w-[50%] h-[8%] flex justify-center items-center rounded-2xl hover:cursor-pointer">Choose a file:</label> 
      <input className="hidden"type="file" id="file" onChange={handleFileChange} />
      <div> File content: {fileContent}</div>
    </div>
  )
}

export default File
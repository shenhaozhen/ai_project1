import { useEffect } from "react"
import { useState } from "react"

const LeftMenu = ({icons, setIcon}) => {

  
  const [iconUrl, setIconUrl] = useState([])

  useEffect(()=>{
    let iconUrlTemp = [];
    for (let i = 0; i < icons.length; i++) {
        iconUrlTemp.push(generateIconUrl(false, icons[i]))
    }
    setIconUrl([...iconUrlTemp])
  },[])

  const generateIconUrl = (isWhite, iconName) => {
     if (isWhite) {
        return new URL(`./assets/${iconName}_white.png`,import.meta.url).href
     } else {
        return new URL(`./assets/${iconName}.png`,import.meta.url).href
     }
  }

  const onMouseEnter = (icon,index) => {
    let newUrl = new URL(`./assets/${icon}_white.png`,import.meta.url).href
    let res = [...iconUrl]
    res[index] = newUrl
    setIconUrl([...res])
  }

  const onMouseLeave = (icon,index) => {
    let newUrl = new URL(`./assets/${icon}.png`,import.meta.url).href
    let res = [...iconUrl]
    res[index] = newUrl
    setIconUrl([...res])
  }

  const handleClick = (index) => {
    setIcon(index)
  }

  return (
    <>
        {icons.map((icon, index) => (
            <div key={index} className="w-full h-[50px] flex justify-center items-center cursor-pointer">
                <img className='w-[70%]' src={iconUrl[index]} alt={icon} onMouseEnter={() => onMouseEnter(icon,index)}
                     onMouseLeave={() => onMouseLeave(icon,index)} onClick={()=>handleClick(index)}/>
            </div>
        ))}
    </>
  )
}

export default LeftMenu

import { useDataStore } from "../store/zustand"

const DatabaseUi = () => {

  const items = useDataStore(state => state.items)
  let keys;
  if (items.length > 0) {
    keys = Object.keys(items[0])
  }

  return (
    <div className="w-full overflow-auto bg-green-300">
      <table className="w-full">
        <thead>
          <tr>
            {keys?.map((key, index) => {
              return <th key={index} className="border-[1px] border-black">{key}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => {
            return (
              <tr key={index}>
                {keys?.map((key, index) => {
                  return <td key={index} className="border-[1px] border-black">{item[key]}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DatabaseUi

/*
         <ul className="h-full w-full">
          {items.map((item, index) => {

            let text = "" ;

            for (let key in item) {
               text += key + ": " + item[key] + `\n`;
            }
            return (
                <li className=" border-[1px] border-black whitespace-pre-line px-[1%]" key={index}>
                   {text}
                </li>
            )
          })}
          </ul>
*/
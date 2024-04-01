import { useDataStore } from "../store/zustand"



const fakeData = [{name: "John", age: 23}, {name: "Jane", age: 24}, {name: "Joe", age: 25}]

const DatabaseUi = () => {

  const items = useDataStore(state => state.items)

  return (
    <div className="h-[85%] w-[25%] bg-white flex flex-col-reverse">
        <div className="grow bg-green-100 overflow-auto">
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
        </div>
    </div>
  )
}

export default DatabaseUi
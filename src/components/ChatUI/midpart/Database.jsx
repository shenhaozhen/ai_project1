import {useState, useEffect} from "react"
import { fetchData } from "../../../api/database_api"
import { useDataStore } from "../../../store/zustand"

const databaseList = ['countries']

export const Database = ({databaseSchema}) => {

  console.log(databaseSchema)

  const [database, setDatabase] = useState('') 
  const replace = useDataStore((state) => state.replace);
  const clear = useDataStore((state) => state.clear);

  useEffect(() => {
       if (database == "") {
        fetchData('' , clear)
       } else {
        fetchData(database , replace)
       }

       return () => {
        clear()
        }
  }, [database])

  return (
    <div className="flex h-full w-full flex-col">

        <p className="h-[10%] bg-cyan-300 mb-[2%] pl-[1%]"> Current Database: {database == "" ? "not selected" : database} </p>

        <div className=" h-[10%] bg-green-300 pl-[1%] mb-[2%]">
            <label htmlFor="database-select">Choose the database:</label>
            <select className="w-[90%]" name="database" id="database-select" onChange={(e)=>{setDatabase(e.target.value)}}>
                <option value="">--Please choose an option--</option>
                <option value="countries">countries</option>
            </select>
        </div>

        <div className="grow bg-lime-300 whitespace-pre overflow-auto">
            {databaseSchema}
        </div>

        
    </div>
  )
}

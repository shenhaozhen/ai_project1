import {useState, useEffect} from "react"
import { fetchData } from "../../../api/database_api"
import { useDataStore, useDatabaseStore } from "../../../store/zustand"
import  databaseJson from "./asset/database.json"

export const Database = () => {

  const [database, setDatabase] = useState('') 
  const replace = useDataStore((state) => state.replace);
  const clear = useDataStore((state) => state.clear);

  const setCurrent = useDatabaseStore((state) => state.setDatabase);
  const current = useDatabaseStore((state) => state.database);

  
  useEffect(() => {
    if (current.name != "") {
      setDatabase(current.name)
    }
  }, [current])

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


  const handleChange = (e) => {
    setDatabase(e.target.value)
    let database = databaseJson.filter((item) => item["d_name"] == e.target.value)
    if(database.length > 0) {
      setCurrent({name: database[0]["d_name"], schema: database[0]["d_schema"]})
    } else{
      setCurrent({name: "", schema: ""})
    }
  }

  return (
    <div className="flex h-full w-full flex-col">

        <p className="h-[10%] bg-cyan-300 pl-[1%]"> Current Database: {database == "" ? "not selected" : database} </p>

        <div className="bg-green-300 pl-[1%]">
            <label htmlFor="database-select">Choose the database: return the schema and the first three rows</label>
            <select className="w-[90%]" name="database" id="database-select" onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {
                    databaseJson.map((item, index) => {
                        return <option key={index} value={item["d_name"]}>{item["d_name"]}</option>
                    })
                }
            </select>
        </div>

        <div className="grow bg-lime-300 whitespace-pre overflow-auto p-[2%]">
                {
                  databaseJson.filter((item) => item["d_name"] == database).map((item, index) => {
                    return (
                      <div key={index} className="w-full">
                          {item["d_schema"]}
                      </div>
                    )
                  })
                }
        </div>

        
    </div>
  )
}

//  <option value="countries">countries</option>
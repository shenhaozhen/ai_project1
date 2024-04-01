import supabase from "./supabase";

export const fetchData = async (databaseName, callback) => {

    try {
      if (databaseName === undefined || databaseName === null || databaseName == "")  {
        console.log("Database name is empty");
        callback();
        return;
      }
      const {data} = await supabase.from(databaseName).select('id,name').limit(3);
      callback(data);

    } catch (error) {
        console.log("Error fetching data: ", error);
    }

}
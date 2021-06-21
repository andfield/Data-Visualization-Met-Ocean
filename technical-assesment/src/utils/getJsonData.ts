//Function to fetch Json file and return data and KeyNames.
export async function fetchJson() {
    // Initiate the variables to store dates, file, keynames.
    var jsonDates: Array<string> = [];
    var jsonData: { [key: string]: any } = {};
    var jsonKeyNames: Array<string> = []

    //Fetch request to public directory to get Json file.
    await fetch("data/data.json")
        //Parse the response to json
        .then((res) => res.json())
        //Finally set the dates to be Object keys and data to be the jsondata.
        .then((data) => {
            jsonDates = Object.keys(data);
            jsonData = data;

            //store the data in a map
            let myMap = new Map(Object.entries(jsonData))
            
            //for each key get the subkey name and save it.
            myMap.forEach((item) => {
                Object.keys(item).forEach((key) => {
                    if(!jsonKeyNames.includes(key)){
                        jsonKeyNames.push(key)
                    }
                })
            })
            // console.log(jsonKeyNames)
        })
        // Error handling
        .catch((err) => {
            console.log(err)
        })
    
    return{
        data: jsonData,
        dates: jsonDates,
        keyNames: jsonKeyNames
    }
}

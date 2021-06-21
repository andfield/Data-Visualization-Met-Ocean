import { fetchCsv } from './getCsvData'
import { fetchJson } from './getJsonData'

//Function to merge the 2 data sets and return a combined set and all key names.
export async function merge() {
    //Get and store the 2 data sets locally.
    const csvData = await fetchCsv()
    const jsonData = await fetchJson()
   
    //variables to store merged data and keys.
    var mergedData: { [key: string]: any } = {};
    var allKeys: string[] = []

    // Variable to store all dates.
    var allDates: Array<string> = jsonData.dates
    
    // Algorithm to sort and store dates using csv dates because its the bigger data set.
    for (let i: number = 0; i < csvData.dates.length; i++) {
        //Make sure dates are unique.
        if (!allDates.includes(csvData.dates[i])) {
            allDates.push(csvData.dates[i])
        }
    }

    //Merge Algorithm
    for (let i: number = 0; i < jsonData.dates.length; i++) {

        var currentData: { [key: string]: any } = {};
        const date = allDates[i];

        for (let j: number = 0; j < csvData.keyNames.length; j++) {
            const currentKey = csvData.keyNames[j];
            if (!allKeys.includes(currentKey)) {
                allKeys.push(currentKey)
            }
            if (csvData.dates.includes(date)) {
                currentData[currentKey] = csvData.data[date][currentKey] || null
            }
        }
        for (let k: number = 0; k < jsonData.keyNames.length; k++) {
            const currentKey = jsonData.keyNames[k]
            var someTempVar = jsonData.data[date] || null
            if (!allKeys.includes(currentKey)) {
                allKeys.push(currentKey)
            }
            if (someTempVar != null) { currentData[currentKey] = someTempVar[currentKey] || null }

        }

        mergedData[date] = currentData;


    }
    // Storing the merged data in a map for better usage.
    var map = new Map(Object.entries(mergedData))

    return {
        mergerdMap: map,
        keys: allKeys
    }
}

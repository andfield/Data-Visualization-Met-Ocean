import Papa from "papaparse";

// Function to fetch the csv file and Conver it to Json while getting important information out like Dates and KeyNames.
export async function fetchCsv() {
    //Initialize a variable of type string to store the decoded csv file.
    var csvFile: string = "";

    //Initialize a varable of type object where key is of type string and value of type any. This will be used to store converted Json data.
    var csvData: { [key: string]: any } = {};

    //Initialize a variable of type string arrray used to store the Key names of csv file.
    var csvKeyNames: Array<string> = []

    //Initialize date variable of type string array to store all the dates.
    var csvDates: Array<string> = []

    //A Fetch request to public directory to get the csv file.
    await fetch("data/data.csv")
        //Get the response body which has the csv file now and use getReader to create a reader and lock the stream.
        .then((res) => res.body?.getReader())
        .then(async (file) => {
            //Store the Unit8Array of the file in a const.
            const result = await file?.read();
            //Initiate and Store the TextDecoder interface in a const.
            const decoder = new TextDecoder("utf-8");
            //Finally decode the Unit8Array into utf-8 using Textdecoder.
            csvFile = decoder.decode(result?.value);
        })
        .finally(() => {
            //Use an open source parser to parse the decoded csvfile
            Papa.parse(csvFile, {
                complete: function (results) {
                    //Store the parsed data which should be a multi-dimensional array in a variable.
                    var dataArray: any = results.data;

                    //Store the KeyNames of CSV file into a string array don't include DateTime Key.
                    csvKeyNames = dataArray[0]?.slice(1)

                    // Loop through the dataArray start at 1 to avoid the KeyName array.
                    for (let i = 1; i < dataArray.length; i++) {
                        //Get the current Row.
                        const row = dataArray[i];
                        //Get the current dateTime.
                        const date = row[0];

                        //Check if the date is empty.
                        if (date !== "") {
                            //store the not empty dates into a string array.
                            csvDates.push(date);
                            // Temp object to store row data.
                            let currentData: { [key: string]: number } = {}
                            // Loop through the Key array 
                            for (let j: number = 0; j < csvKeyNames.length; j++) {

                                // Set the Temp row data with current Key and its value.
                                currentData[csvKeyNames[j]] = row[j + 1];
                            }
                            csvData[date] = currentData;
                        }
                    }
                }
            });
        })
        // Error handling
        .catch((err) => {
            console.log(err)
        })
    return {
        data: csvData,
        keyNames: csvKeyNames,
        dates: csvDates
    }
}
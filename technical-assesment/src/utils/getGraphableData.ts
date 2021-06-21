//Import the merge algorithm.
import { merge} from './mergeData'

//Function which takes yAxis name as argument sorts the data in a object array suitable for plotting.
export async function getData(yAxis: string) {
    //Get merger data.
    const mergedData = await merge();

    //variable to store formated data.
    var data: { x: Date; y: any }[] = [];

    mergedData.mergedMap.forEach((item, index) => {
        //If current item is not null or undefined
        if (
            item[yAxis] !== "null" &&
            item[yAxis] !== null &&
            item[yAxis] !== undefined
        ) {
            //add the current item to the formated data array.
            data.push({
                x: new Date(index),
                y: +item[yAxis]
            })

        } else {
            //if the data is null then make usre y axis val is set to null.
            data.push({ x: new Date(index), y: null });
        }
    });
    //Return the formatted array.
    return data;
}

//Function which takes 2 arguments for x and y axis and returns formatted data back.
export async function getStaticData(x: string, y: string) {

    var data: { x: number; y: number }[] = [];

    const mergedData = await merge();

    mergedData.mergedMap.forEach((item, index) => {
        //temp variables
        var tempx = 0;
        var tempy = 0;
    
    //Check if current item has x val.
      if (
            item[x] !== "null" &&
            item[x] !== null &&
            item[x] !== undefined
        ) {
            //save the current x val
            tempx = +item[x]
        }
    //Check if current item has y val.
        if (item[y] !== "null" &&
            item[y] !== null &&
            item[y] !== undefined) 
        {
            //save current y val
            tempy = +item[y]
        }

        //push the data to a object array
        data.push({x: tempx, y: tempy})
    })

    //return the formatted data.
    return data

}

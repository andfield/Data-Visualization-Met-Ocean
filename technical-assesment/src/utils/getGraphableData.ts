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

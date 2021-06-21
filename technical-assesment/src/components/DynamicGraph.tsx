//React Imports.
import React from "react";
import { useState, useEffect } from "react";

//Victory chart imports
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory";

//Util import.
import { getData } from "../utils/getGraphableData";

function DynamicGraph(props: any) {
  //Destructure props
  var yAxis: string = props.yAxis;

  //States to store the plotable data.
  const [data, setData] = useState<{ x: Date; y: number }[]>([]);

  //States for the Zoom and slide functions.
  const [selectedDomain, setSD] = useState<any>();
  const [zoomDomain, setZD] = useState<any>();

  useEffect(() => {
    async function set() {
      //Fetch plotable data from getData util by passing Y-axis name and store the returned data in state.
      setData(await getData(yAxis));
    }
    set();
  }, [yAxis]);

  //Function to Get all the ticks.
  function getTicks() {
    var ticks = [];

    for (let i = 8; i <= 18; i++) {
      ticks.push(new Date(2018, 10, i));
    }

    return ticks;
  }

  return (
    <div>
    {/* check if yAxis is provided else print loading. */}
      {yAxis ? (
        <>
        {/* Main Graph which has zoomable x-axis */}
          <VictoryChart
            theme={VictoryTheme.material}
            height={260}
            width={800}
            domainPadding={{ x: [10, 0], y: [0, 10] }}
            animate={{ duration: 300 }}
            containerComponent={
              <VictoryZoomContainer
                responsive={true}
                zoomDimension="x"
                zoomDomain={zoomDomain}
                onZoomDomainChange={(val) => setSD(val)}
              />
            }
            scale={{ x: "time" }}
          >
            <VictoryLine
              padding={0}
              interpolation="linear"
              data={data}
              x="x"
              y="y"
              style={{ data: { stroke: "#f87c73", strokeWidth: 1 } }}
              scale={{ x: "time", y: "linear" }}
              animate={{
                onExit: {
                  duration: 300,
                  before: () => ({
                    _y: 0,
                  }),
                },
              }}
            />
            <VictoryScatter
              padding={0}
              data={data}
              animate={{
                onExit: {
                  duration: 200,
                  before: () => ({
                    _y: 0,
                  }),
                },
              }}
              style={{ data: { fill: "#e9cf06" } }}
            />
          </VictoryChart>
          
          {/* Slider Graph to control the zoom on main graph. */}
          <VictoryChart
            height={90}
            width={800}
            scale={{ x: "time" }}
            domainPadding={{ x: [10, 0], y: [0, 10] }}
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryBrushContainer
                responsive={true}
                brushDimension="x"
                brushDomain={selectedDomain}
                onBrushDomainChange={(val) => setZD(val)}
              />
            }
          >
            <VictoryAxis tickValues={getTicks()} />
            <VictoryLine
              style={{
                data: { stroke: "#f87c73" },
              }}
              data={data}
            />
          </VictoryChart>
        </>
      ) : (
        <div style={{marginTop: '50px'}}>Loading...</div>
      )}
    </div>
  );
}

export default DynamicGraph;

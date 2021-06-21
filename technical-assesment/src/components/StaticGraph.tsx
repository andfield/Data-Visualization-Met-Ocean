//React Imports
import React from "react";
import { useState, useEffect } from "react";

//Victory imports
import {
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory";

//util imports
import { getStaticData } from "../utils/getGraphableData";

function StaticGraph() {
  //States to store the plotable data.
  const [data, setData] = useState<{ x: number; y: number }[]>([]);

  //States for the Zoom and slide functions.
  const [selectedDomain, setSD] = useState<any>();
  const [zoomDomain, setZD] = useState<any>();

  useEffect(() => {
    async function set() {
      //Fetch plotable data from getData util by passing Y-axis name and store the returned data in state.
      setData(
        await getStaticData(
          "sea_surface_wave_significant_height",
          "surface_sea_water_speed"
        )
      );
    }
    set();
  }, []);

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        height={260}
        width={800}
        domainPadding={{ x: [0, 40], y: [20, 5] }}
        animate={{ duration: 300 }}
        containerComponent={
          <VictoryZoomContainer
            responsive={true}
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={(val) => setSD(val)}
          />
        }
        scale={{ x: "linear" }}
      >
        <VictoryLine
          interpolation="linear"
          data={data}
          x="x"
          y="y"
          style={{ data: { stroke: "#f87c73", strokeWidth: 1 } }}
          scale={{ x: "linear", y: "linear" }}
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
      <VictoryChart
        height={90}
        width={800}
        scale={{ x: "linear", y: "linear" }}
        domainPadding={{ x: [0, 20], y: [0, 10] }}
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
        <VictoryLine
          style={{
            data: { stroke: "#f87c73" },
          }}
          data={data}
        />
      </VictoryChart>
    </div>
  );
}

export default StaticGraph;

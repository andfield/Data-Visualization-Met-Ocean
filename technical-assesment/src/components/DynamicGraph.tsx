//React Imports.
import React from "react";
import { useState, useEffect } from "react";

//Victory chart imports
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
} from "victory";

function DynamicGraph() {
  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{ x: [0, 5], y: [0, 7] }}
      >
        <VictoryScatter
          style={{ data: { fill: "#c43a31" } }}
          size={7}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 },
          ]}
        />
      </VictoryChart>
    </div>
  );
}

export default DynamicGraph;
